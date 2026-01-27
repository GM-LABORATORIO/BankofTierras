// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./BotToken.sol";

/**
 * @title BotTreasury
 * @dev Treasury for Bank of Tierras $BoT EcoToken
 * @notice Manages EcoToken minting/burning with AVAX backing
 */
contract BotTreasury is Ownable, ReentrancyGuard, Pausable {
    BotToken public immutable botToken;
    
    // Pricing
    uint256 public botPriceInAvax = 0.001 ether; // 1 $BoT EcoToken = 0.001 AVAX (~$0.012 USD)
    bool public useMarketPrice = false; // Can be enabled later for DEX integration
    
    // Fees
    uint256 public protocolFeePercent = 300; // 3% (300 basis points)
    uint256 public constant FEE_DENOMINATOR = 10000;
    uint256 public accumulatedFees;
    
    // Burn mechanism
    uint256 public burnPercent = 100; // 1% burned on carbon purchases
    uint256 public totalBurned;
    
    // Originators whitelist
    mapping(address => bool) public isOriginator;
    uint256 public originatorCount;
    
    // Stats
    uint256 public totalBotSold;
    uint256 public totalAvaxReceived;
    
    event BotPurchased(address indexed buyer, uint256 avaxAmount, uint256 botAmount, uint256 fee);
    event BotRedeemed(address indexed originator, uint256 botAmount, uint256 avaxAmount);
    event BotBurned(uint256 amount, string reason);
    event OriginatorStatusChanged(address indexed originator, bool status);
    event FeesWithdrawn(address indexed to, uint256 amount);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event MarketPriceEnabled(bool enabled);
    
    constructor(address _botToken) {
        require(_botToken != address(0), "Invalid token");
        botToken = BotToken(_botToken);
    }
    
    /**
     * @dev Buy $BoT with AVAX
     */
    function buyBot() external payable nonReentrant whenNotPaused {
        require(msg.value > 0, "Must send AVAX");
        
        // Calculate fee
        uint256 fee = (msg.value * protocolFeePercent) / FEE_DENOMINATOR;
        uint256 avaxAfterFee = msg.value - fee;
        
        // Calculate $BoT amount
        uint256 botAmount = (avaxAfterFee * 1e18) / botPriceInAvax;
        
        // Update stats
        accumulatedFees += fee;
        totalBotSold += botAmount;
        totalAvaxReceived += msg.value;
        
        // Mint $BoT
        botToken.mint(msg.sender, botAmount);
        
        emit BotPurchased(msg.sender, msg.value, botAmount, fee);
    }
    
    /**
     * @dev Redeem $BoT for AVAX (originators only)
     * 2% fee is deducted and sent to treasury wallet
     */
    function redeemBot(uint256 botAmount) external nonReentrant whenNotPaused {
        require(isOriginator[msg.sender], "Only originators");
        require(botAmount > 0, "Invalid amount");
        require(botToken.balanceOf(msg.sender) >= botAmount, "Insufficient balance");
        
        // Calculate AVAX to return
        uint256 avaxAmount = (botAmount * botPriceInAvax) / 1e18;
        
        // Calculate 2% redemption fee
        uint256 redemptionFee = (avaxAmount * 200) / FEE_DENOMINATOR; // 2%
        uint256 netAvaxAmount = avaxAmount - redemptionFee;
        
        uint256 treasuryBalance = address(this).balance - accumulatedFees;
        require(treasuryBalance >= avaxAmount, "Insufficient treasury");
        
        // Burn $BoT
        botToken.burn(msg.sender, botAmount);
        
        // Send net AVAX to originator
        (bool successOriginator, ) = payable(msg.sender).call{value: netAvaxAmount}("");
        require(successOriginator, "Transfer to originator failed");
        
        // Send fee to treasury wallet (owner)
        if (redemptionFee > 0) {
            (bool successTreasury, ) = payable(owner()).call{value: redemptionFee}("");
            require(successTreasury, "Transfer to treasury failed");
        }
        
        emit BotRedeemed(msg.sender, botAmount, netAvaxAmount);
    }
    
    /**
     * @dev Burn $BoT (used when purchasing carbon credits)
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function burnForPurchase(address from, uint256 amount) external nonReentrant {
        require(msg.sender == owner() || msg.sender == address(botToken), "Unauthorized");
        require(amount > 0, "Invalid amount");
        
        uint256 burnAmount = (amount * burnPercent) / FEE_DENOMINATOR;
        
        if (burnAmount > 0) {
            botToken.burn(from, burnAmount);
            totalBurned += burnAmount;
            emit BotBurned(burnAmount, "Carbon purchase");
        }
    }
    
    /**
     * @dev Add/remove originator
     */
    function setOriginator(address originator, bool status) external onlyOwner {
        require(originator != address(0), "Invalid address");
        
        if (status && !isOriginator[originator]) {
            originatorCount++;
        } else if (!status && isOriginator[originator]) {
            originatorCount--;
        }
        
        isOriginator[originator] = status;
        emit OriginatorStatusChanged(originator, status);
    }
    
    /**
     * @dev Batch add originators
     */
    function addOriginatorsBatch(address[] calldata originators) external onlyOwner {
        for (uint256 i = 0; i < originators.length; i++) {
            if (!isOriginator[originators[i]]) {
                isOriginator[originators[i]] = true;
                originatorCount++;
                emit OriginatorStatusChanged(originators[i], true);
            }
        }
    }
    
    /**
     * @dev Update $BoT price (only if market price not enabled)
     */
    function setBotPrice(uint256 newPrice) external onlyOwner {
        require(!useMarketPrice, "Market price enabled");
        require(newPrice > 0, "Invalid price");
        uint256 oldPrice = botPriceInAvax;
        botPriceInAvax = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }
    
    /**
     * @dev Enable market-based pricing (irreversible)
     */
    function enableMarketPrice() external onlyOwner {
        require(!useMarketPrice, "Already enabled");
        useMarketPrice = true;
        emit MarketPriceEnabled(true);
    }
    
    /**
     * @dev Update protocol fee
     */
    function setProtocolFee(uint256 newFeePercent) external onlyOwner {
        require(newFeePercent <= 1000, "Max 10%");
        protocolFeePercent = newFeePercent;
    }
    
    /**
     * @dev Update burn percentage
     */
    function setBurnPercent(uint256 newBurnPercent) external onlyOwner {
        require(newBurnPercent <= 500, "Max 5%");
        burnPercent = newBurnPercent;
    }
    
    /**
     * @dev Withdraw protocol fees
     */
    function withdrawFees(address payable to) external onlyOwner nonReentrant {
        require(to != address(0), "Invalid address");
        uint256 amount = accumulatedFees;
        require(amount > 0, "No fees");
        
        accumulatedFees = 0;
        
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FeesWithdrawn(to, amount);
    }
    
    /**
     * @dev Get treasury balance (excluding fees)
     */
    function getTreasuryBalance() external view returns (uint256) {
        return address(this).balance - accumulatedFees;
    }
    
    /**
     * @dev Get stats
     */
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
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    receive() external payable {}
}
