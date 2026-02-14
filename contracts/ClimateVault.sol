// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// Interface for CarbonV2 to allow minting/burning from the Vault
interface ICarbonToken is IERC20 {
    function mint(address to, uint256 amount) external;
    function burnFrom(address account, uint256 amount) external;
}

/**
 * @title ClimateVault
 * @dev Institutional Vault for Amazonas Cero. Handles NFT "Vaulting" for $CARBON issuance
 * and Signal Aggregation for legal liquidation.
 * Designed for Avalanche Evergreen Subnet with CertiK-level security.
 */
contract ClimateVault is AccessControl, ReentrancyGuard, Pausable, IERC721Receiver {
    using SafeERC20 for ICarbonToken;

    // ============ Roles ============
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VAULT_MANAGER_ROLE = keccak256("VAULT_MANAGER_ROLE");
    
    // ============ Constants ============
    uint256 public constant GRAMS_PER_TONNE = 1_000_000 * 10**18; // 1 $CARBON = 1 Gram (18 decimals)

    // ============ Immutables ============
    ICarbonToken public immutable carbonToken;
    IERC721 public immutable projectNft;

    // ============ State Variables ============
    struct Signal {
        uint256 totalGramsBurned;
        uint256 lastUpdate;
        bool liquidationPending;
    }

    mapping(address => Signal) public userSignals;
    mapping(uint256 => address) public nftDepositors;
    mapping(uint256 => bool) public isLocked;
    mapping(uint256 => bool) public isPermanentlyRetired;

    uint256 public totalGramsBurnedGlobal;
    uint256 public totalTonsLiquidated;

    // ============ Events ============
    /**
     * @dev Emitted when a user burns $CARBON to generate a climate impact signal.
     */
    event SignalEmitted(address indexed user, uint256 amountGrams, uint256 timestamp);
    
    /**
     * @dev Emitted when an NFT is locked in the vault to issue fractional grams.
     */
    event NFTVaulted(uint256 indexed tokenId, address indexed depositor);
    
    /**
     * @dev Emitted when a total Tonne threshold is reached for legal processing.
     */
    event LegalLiquidationRequested(uint256 indexed tonAmount, uint256 timestamp, uint256 globalGramsAtEvent);
    
    /**
     * @dev Emitted when a corporate entity permanently retires NFTs for massive offset.
     */
    event CorporateBurnExecuted(address indexed company, uint256[] tokenIds, uint256 totalGrams);

    /**
     * @dev Emitted when the daily liquidation limit is updated.
     */
    event DailyLimitUpdated(uint256 newLimit);

    // ============ Errors ============
    error NotNFTOwner();
    error InvalidAmount();
    error NFTAlreadyRetired();
    error InvalidAddress();
    error CircuitBreakerTripped();

    // ============ Circuit Breaker State ============
    uint256 public maxDailyLiquidation = 500 * GRAMS_PER_TONNE; // Default: 500 Tonnes/day
    uint256 public dailyLiquidationAmount;
    uint256 public lastLiquidationWindow;

    /**
     * @notice Constructor initializes the vault with token and NFT addresses.
     * @param _carbonToken Address of the $CARBON token.
     * @param _projectNft Address of the Project NFT contract.
     * @param _admin Address of the initial administrator.
     */
    constructor(address _carbonToken, address _projectNft, address _admin) {
        if (_carbonToken == address(0) || _projectNft == address(0) || _admin == address(0)) revert InvalidAddress();
        
        carbonToken = ICarbonToken(_carbonToken);
        projectNft = IERC721(_projectNft);
        
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(ADMIN_ROLE, _admin);
        _grantRole(VAULT_MANAGER_ROLE, _admin);
        
        lastLiquidationWindow = block.timestamp / 1 days;
    }

    /**
     * @notice Locks an NFT (1 Tonne) and mints 1,000,000 $CARBON (Grams) to the depositor.
     * @dev Complies with RWA fractionalization standards.
     * @param tokenId The ID of the AmazonasProject NFT.
     */
    function lockNFT(uint256 tokenId) external nonReentrant whenNotPaused {
        if (projectNft.ownerOf(tokenId) != msg.sender) revert NotNFTOwner();
        
        // Effects
        nftDepositors[tokenId] = msg.sender;
        isLocked[tokenId] = true;

        // Interactions
        projectNft.safeTransferFrom(msg.sender, address(this), tokenId);
        carbonToken.mint(msg.sender, GRAMS_PER_TONNE);

        emit NFTVaulted(tokenId, msg.sender);
    }

    /**
     * @notice Burns $CARBON to compensate CO2 impact.
     * @dev Triggers a LegalLiquidationRequested event when a global tonne is reached.
     * @dev Includes a Circuit Breaker to prevent sudden mass liquidations.
     * @param amountGrams The amount of grams (18 decimals) to burn.
     */
    function redeemGrams(uint256 amountGrams) external nonReentrant whenNotPaused {
        if (amountGrams == 0) revert InvalidAmount();
        
        // Circuit Breaker Check
        _checkCircuitBreaker(amountGrams);

        // Effects
        userSignals[msg.sender].totalGramsBurned += amountGrams;
        userSignals[msg.sender].lastUpdate = block.timestamp;
        totalGramsBurnedGlobal += amountGrams;

        // Interactions
        carbonToken.burnFrom(msg.sender, amountGrams);

        emit SignalEmitted(msg.sender, amountGrams, block.timestamp);

        // Check for legal liquidation threshold (1M grams = 1 Tonne)
        uint256 currentTons = totalGramsBurnedGlobal / GRAMS_PER_TONNE;
        if (currentTons > totalTonsLiquidated) {
            uint256 tonsToLiquidate = currentTons - totalTonsLiquidated;
            totalTonsLiquidated = currentTons;
            emit LegalLiquidationRequested(tonsToLiquidate, block.timestamp, totalGramsBurnedGlobal);
        }
    }

    /**
     * @notice Permamently retires NFTs for large-scale institutional compensation.
     * @dev This is an atomic operation for Corporate Tiers.
     * @param tokenIds Array of NFT IDs to be retired.
     */
    function corporateBurn(uint256[] calldata tokenIds) external nonReentrant whenNotPaused {
        uint256 count = tokenIds.length;
        if (count == 0) revert InvalidAmount();
        
        uint256 totalGramsToAdd = count * GRAMS_PER_TONNE;
        
        // Circuit Breaker Check
        _checkCircuitBreaker(totalGramsToAdd);

        // Effects
        totalGramsBurnedGlobal += totalGramsToAdd;
        totalTonsLiquidated += count;

        for (uint256 i = 0; i < count; i++) {
            uint256 tid = tokenIds[i];
            if (projectNft.ownerOf(tid) != msg.sender) revert NotNFTOwner();
            if (isPermanentlyRetired[tid]) revert NFTAlreadyRetired();
            
            isPermanentlyRetired[tid] = true;
            isLocked[tid] = true;
            
            // Interactions
            projectNft.safeTransferFrom(msg.sender, address(this), tid);
        }

        emit CorporateBurnExecuted(msg.sender, tokenIds, totalGramsToAdd);
        emit LegalLiquidationRequested(count, block.timestamp, totalGramsBurnedGlobal);
    }

    /**
     * @dev Internal function to handle daily liquidation limits.
     */
    function _checkCircuitBreaker(uint256 amount) internal {
        uint256 currentWindow = block.timestamp / 1 days;
        if (currentWindow > lastLiquidationWindow) {
            dailyLiquidationAmount = 0;
            lastLiquidationWindow = currentWindow;
        }
        
        if (dailyLiquidationAmount + amount > maxDailyLiquidation) revert CircuitBreakerTripped();
        dailyLiquidationAmount += amount;
    }

    // ============ Admin Functions ============

    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @notice Updates the maximum daily liquidation limit.
     * @param newLimit New limit in grams (including 18 decimals).
     */
    function setMaxDailyLiquidation(uint256 newLimit) external onlyRole(ADMIN_ROLE) {
        maxDailyLiquidation = newLimit;
        emit DailyLimitUpdated(newLimit);
    }

    // ============ View Functions ============

    /**
     * @notice Returns the impact statistics for a specific user.
     */
    function getImpactStats(address user) external view returns (uint256 burned, uint256 global) {
        return (userSignals[user].totalGramsBurned, totalGramsBurnedGlobal);
    }

    /**
     * @dev Required to receive ERC721 tokens.
     */
    function onERC721Received(address, address, uint256, bytes calldata) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
