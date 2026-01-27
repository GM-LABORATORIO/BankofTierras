// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./BotToken_V2_Secure.sol";

/**
 * @title BotTreasury
 * @dev Production-ready Treasury for Bank of Tierras $BoT EcoToken
 * @notice Includes timelock, rate limiting, and comprehensive security features
 */
contract BotTreasury is Ownable, ReentrancyGuard, Pausable {
    
    // ============ State Variables ============
    
    BotToken public immutable botToken;
    
    // Pricing
    uint256 public botPriceInAvax = 0.001 ether; // 1 $BoT = 0.001 AVAX
    
    // Fees
    uint256 public protocolFeePercent = 300; // 3% (300 basis points)
    uint256 public constant FEE_DENOMINATOR = 10000;
    uint256 public constant MAX_FEE = 1000; // 10% max
    uint256 public accumulatedFees;
    
    // Burn mechanism
    uint256 public burnPercent = 100; // 1%
    uint256 public constant MAX_BURN = 500; // 5% max
    uint256 public totalBurned;
    
    // Originators
    mapping(address => bool) public isOriginator;
    uint256 public originatorCount;
    
    // Stats
    uint256 public totalBotSold;
    uint256 public totalAvaxReceived;
    
    // ============ SECURITY ENHANCEMENTS ============
    
    // Timelock for critical functions (48 hours)
    uint256 public constant TIMELOCK_DURATION = 2 days;
    mapping(bytes32 => uint256) public timelocks;
    
    // Rate limiting
    mapping(address => uint256) public lastPurchaseTime;
    mapping(address => uint256) public dailyPurchaseAmount;
    mapping(address => uint256) public dailyPurchaseReset;
    uint256 public constant PURCHASE_COOLDOWN = 1 hours;
    uint256 public constant DAILY_LIMIT = 100 ether; // 100 AVAX per day
    
    // Circuit breaker
    uint256 public dailyWithdrawalLimit = 1000 ether;
    uint256 public dailyWithdrawn;
    uint256 public lastWithdrawalReset;
    
    // Multi-sig (optional - can be set later)
    address public multiSig;
    
    // ============ Events ============
    
    event BotPurchased(address indexed buyer, uint256 avaxAmount, uint256 botAmount, uint256 fee);
    event BotRedeemed(address indexed originator, uint256 botAmount, uint256 avaxAmount);
    event BotBurned(uint256 amount, string reason);
    event OriginatorStatusChanged(address indexed originator, bool status);
    event FeesWithdrawn(address indexed to, uint256 amount);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    event BurnPercentUpdated(uint256 oldPercent, uint256 newPercent);
    event TimelockInitiated(bytes32 indexed txHash, uint256 executeTime);
    event TimelockExecuted(bytes32 indexed txHash);
    event MultiSigUpdated(address indexed newMultiSig);
    event CircuitBreakerTriggered(string reason);
    
    // ============ Custom Errors ============
    
    error InvalidAddress();
    error InvalidAmount();
    error OnlyOriginators();
    error InsufficientBalance();
    error InsufficientTreasury();
    error TransferFailed();
    error NoFees();
    error TimelockNotExpired();
    error TimelockNotInitiated();
    error ExceedsMaxFee();
    error ExceedsMaxBurn();
    error PurchaseCooldownActive();
    error DailyLimitExceeded();
    error CircuitBreakerActive();
    error SlippageTooHigh();
    
    // ============ Modifiers ============
    
    modifier onlyMultiSigOrOwner() {
        require(
            msg.sender == owner() || (multiSig != address(0) && msg.sender == multiSig),
            "Not authorized"
        );
        _;
    }
    
    // ============ Constructor ============
    
    constructor(address _botToken) Ownable(msg.sender) {
        if (_botToken == address(0)) revert InvalidAddress();
        botToken = BotToken(_botToken);
        lastWithdrawalReset = block.timestamp;
    }
    
    // ============ Core Functions ============
    
    /**
     * @dev Buy $BoT with AVAX (with rate limiting and slippage protection)
     * @param minBotAmount Minimum tokens to receive (slippage protection)
     */
    function buyBot(uint256 minBotAmount) external payable nonReentrant whenNotPaused {
        if (msg.value == 0) revert InvalidAmount();
        
        // ✅ Rate limiting
        if (block.timestamp < lastPurchaseTime[msg.sender] + PURCHASE_COOLDOWN) {
            revert PurchaseCooldownActive();
        }
        
        // ✅ Daily limit check
        if (block.timestamp > dailyPurchaseReset[msg.sender] + 1 days) {
            dailyPurchaseAmount[msg.sender] = 0;
            dailyPurchaseReset[msg.sender] = block.timestamp;
        }
        
        if (dailyPurchaseAmount[msg.sender] + msg.value > DAILY_LIMIT) {
            revert DailyLimitExceeded();
        }
        
        // Calculate fee
        uint256 fee = (msg.value * protocolFeePercent) / FEE_DENOMINATOR;
        uint256 avaxAfterFee = msg.value - fee;
        
        // Calculate $BoT amount
        uint256 botAmount = (avaxAfterFee * 1e18) / botPriceInAvax;
        
        // ✅ Slippage protection
        if (botAmount < minBotAmount) revert SlippageTooHigh();
        
        // Update stats
        accumulatedFees += fee;
        totalBotSold += botAmount;
        totalAvaxReceived += msg.value;
        lastPurchaseTime[msg.sender] = block.timestamp;
        dailyPurchaseAmount[msg.sender] += msg.value;
        
        // Mint $BoT
        botToken.mint(msg.sender, botAmount);
        
        emit BotPurchased(msg.sender, msg.value, botAmount, fee);
    }
    
    /**
     * @dev Redeem $BoT for AVAX (originators only, with 2% fee)
     * @param botAmount Amount of $BoT to redeem
     */
    function redeemBot(uint256 botAmount) external nonReentrant whenNotPaused {
        if (!isOriginator[msg.sender]) revert OnlyOriginators();
        if (botAmount == 0) revert InvalidAmount();
        if (botToken.balanceOf(msg.sender) < botAmount) revert InsufficientBalance();
        
        // Calculate AVAX to return
        uint256 avaxAmount = (botAmount * botPriceInAvax) / 1e18;
        
        // Calculate 2% redemption fee
        uint256 redemptionFee = (avaxAmount * 200) / FEE_DENOMINATOR;
        uint256 netAvaxAmount = avaxAmount - redemptionFee;
        
        // ✅ Circuit breaker check
        if (block.timestamp > lastWithdrawalReset + 1 days) {
            dailyWithdrawn = 0;
            lastWithdrawalReset = block.timestamp;
        }
        
        if (dailyWithdrawn + avaxAmount > dailyWithdrawalLimit) {
            emit CircuitBreakerTriggered("Daily withdrawal limit exceeded");
            revert CircuitBreakerActive();
        }
        
        uint256 treasuryBalance = address(this).balance - accumulatedFees;
        if (treasuryBalance < avaxAmount) revert InsufficientTreasury();
        
        dailyWithdrawn += avaxAmount;
        
        // Burn $BoT (requires approval)
        botToken.burn(msg.sender, botAmount);
        
        // Send net AVAX to originator
        (bool successOriginator, ) = payable(msg.sender).call{value: netAvaxAmount}("");
        if (!successOriginator) revert TransferFailed();
        
        // Send fee to treasury wallet
        if (redemptionFee > 0) {
            (bool successTreasury, ) = payable(owner()).call{value: redemptionFee}("");
            if (!successTreasury) revert TransferFailed();
        }
        
        emit BotRedeemed(msg.sender, botAmount, netAvaxAmount);
    }
    
    /**
     * @dev Burn $BoT for carbon purchases
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function burnForPurchase(address from, uint256 amount) external nonReentrant onlyOwner {
        if (amount == 0) revert InvalidAmount();
        
        uint256 burnAmount = (amount * burnPercent) / FEE_DENOMINATOR;
        
        if (burnAmount > 0) {
            botToken.burn(from, burnAmount);
            totalBurned += burnAmount;
            emit BotBurned(burnAmount, "Carbon purchase");
        }
    }
    
    // ============ Admin Functions (with Timelock) ============
    
    /**
     * @dev Set protocol fee (with timelock)
     * @param newFeePercent New fee percentage (basis points)
     */
    function setProtocolFee(uint256 newFeePercent) external onlyMultiSigOrOwner {
        if (newFeePercent > MAX_FEE) revert ExceedsMaxFee();
        
        bytes32 txHash = keccak256(abi.encode("setProtocolFee", newFeePercent));
        
        if (timelocks[txHash] == 0) {
            timelocks[txHash] = block.timestamp + TIMELOCK_DURATION;
            emit TimelockInitiated(txHash, block.timestamp + TIMELOCK_DURATION);
            return;
        }
        
        if (block.timestamp < timelocks[txHash]) revert TimelockNotExpired();
        
        uint256 oldFee = protocolFeePercent;
        protocolFeePercent = newFeePercent;
        delete timelocks[txHash];
        
        emit FeeUpdated(oldFee, newFeePercent);
        emit TimelockExecuted(txHash);
    }
    
    /**
     * @dev Set burn percentage (with timelock)
     * @param newBurnPercent New burn percentage (basis points)
     */
    function setBurnPercent(uint256 newBurnPercent) external onlyMultiSigOrOwner {
        if (newBurnPercent > MAX_BURN) revert ExceedsMaxBurn();
        
        bytes32 txHash = keccak256(abi.encode("setBurnPercent", newBurnPercent));
        
        if (timelocks[txHash] == 0) {
            timelocks[txHash] = block.timestamp + TIMELOCK_DURATION;
            emit TimelockInitiated(txHash, block.timestamp + TIMELOCK_DURATION);
            return;
        }
        
        if (block.timestamp < timelocks[txHash]) revert TimelockNotExpired();
        
        uint256 oldPercent = burnPercent;
        burnPercent = newBurnPercent;
        delete timelocks[txHash];
        
        emit BurnPercentUpdated(oldPercent, newBurnPercent);
        emit TimelockExecuted(txHash);
    }
    
    /**
     * @dev Set bot price (immediate, no timelock for market responsiveness)
     * @param newPrice New price in AVAX
     */
    function setBotPrice(uint256 newPrice) external onlyOwner {
        if (newPrice == 0) revert InvalidAmount();
        uint256 oldPrice = botPriceInAvax;
        botPriceInAvax = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }
    
    /**
     * @dev Set multi-sig wallet
     * @param _multiSig Multi-sig wallet address
     */
    function setMultiSig(address _multiSig) external onlyOwner {
        if (_multiSig == address(0)) revert InvalidAddress();
        multiSig = _multiSig;
        emit MultiSigUpdated(_multiSig);
    }
    
    // ============ Originator Management ============
    
    function setOriginator(address originator, bool status) external onlyOwner {
        if (originator == address(0)) revert InvalidAddress();
        
        if (status && !isOriginator[originator]) {
            originatorCount++;
        } else if (!status && isOriginator[originator]) {
            originatorCount--;
        }
        
        isOriginator[originator] = status;
        emit OriginatorStatusChanged(originator, status);
    }
    
    function addOriginatorsBatch(address[] calldata originators) external onlyOwner {
        for (uint256 i = 0; i < originators.length; i++) {
            if (originators[i] != address(0) && !isOriginator[originators[i]]) {
                isOriginator[originators[i]] = true;
                originatorCount++;
                emit OriginatorStatusChanged(originators[i], true);
            }
        }
    }
    
    // ============ Fee Management ============
    
    /**
     * @dev Withdraw protocol fees (with circuit breaker)
     * @param to Recipient address
     */
    function withdrawFees(address payable to) external onlyMultiSigOrOwner nonReentrant {
        if (to == address(0)) revert InvalidAddress();
        
        uint256 amount = accumulatedFees;
        if (amount == 0) revert NoFees();
        
        // ✅ CEI pattern: Update state before external call
        accumulatedFees = 0;
        
        (bool success, ) = to.call{value: amount}("");
        if (!success) revert TransferFailed();
        
        emit FeesWithdrawn(to, amount);
    }
    
    // ============ View Functions ============
    
    function getTreasuryBalance() external view returns (uint256) {
        return address(this).balance - accumulatedFees;
    }
    
    function getStats() external view returns (
        uint256 _totalBotSold,
        uint256 _totalAvaxReceived,
        uint256 _totalBurned,
        uint256 _originatorCount,
        uint256 _treasuryBalance,
        uint256 _accumulatedFees
    ) {
        return (
            totalBotSold,
            totalAvaxReceived,
            totalBurned,
            originatorCount,
            address(this).balance - accumulatedFees,
            accumulatedFees
        );
    }
    
    // ============ Pause Controls ============
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // ============ Receive AVAX ============
    
    receive() external payable {}
}
