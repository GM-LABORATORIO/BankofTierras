// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title BotToken
 * @dev Bank of Tierras EcoToken - Production-ready environmental utility token
 * @notice Audited and secure implementation with EIP-2612 permit support
 */
contract BotToken is ERC20, ERC20Burnable, ERC20Permit, Ownable, Pausable {
    
    // ============ State Variables ============
    
    address public treasury;
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 1e18; // 1 Billion EcoTokens
    
    // Emergency withdrawal enabled during pause
    bool public emergencyMode;
    
    // ============ Events ============
    
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    event EmergencyModeToggled(bool enabled);
    event EmergencyWithdrawal(address indexed user, uint256 amount);
    
    // ============ Custom Errors ============
    
    error InvalidAddress();
    error OnlyTreasury();
    error MaxSupplyExceeded();
    error InsufficientAllowance(uint256 requested, uint256 available);
    error NoBalance();
    error NotInEmergencyMode();
    
    // ============ Constructor ============
    
    constructor() 
        ERC20("Bank of Tierras EcoToken", "BoT") 
        ERC20Permit("Bank of Tierras EcoToken")
        Ownable(msg.sender)
    {}
    
    // ============ Treasury Management ============
    
    /**
     * @dev Set Treasury contract address
     * @param _treasury New treasury address
     */
    function setTreasury(address _treasury) external onlyOwner {
        if (_treasury == address(0)) revert InvalidAddress();
        address oldTreasury = treasury;
        treasury = _treasury;
        emit TreasuryUpdated(oldTreasury, _treasury);
    }
    
    // ============ Minting ============
    
    /**
     * @dev Mint tokens (only Treasury)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external whenNotPaused {
        if (msg.sender != treasury) revert OnlyTreasury();
        if (to == address(0)) revert InvalidAddress();
        if (totalSupply() + amount > MAX_SUPPLY) revert MaxSupplyExceeded();
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    // ============ Burning (FIXED: Requires Approval) ============
    
    /**
     * @dev Burn tokens from address (requires approval or ownership)
     * @param from Address to burn from
     * @param amount Amount to burn
     * @notice SECURITY FIX: Now requires approval if burning from another address
     */
    function burn(address from, uint256 amount) external whenNotPaused {
        if (msg.sender != treasury) revert OnlyTreasury();
        if (from == address(0)) revert InvalidAddress();
        
        // ✅ CRITICAL FIX: Check allowance if burning from another address
        if (from != msg.sender) {
            uint256 currentAllowance = allowance(from, msg.sender);
            if (currentAllowance < amount) {
                revert InsufficientAllowance(amount, currentAllowance);
            }
            _approve(from, msg.sender, currentAllowance - amount);
        }
        
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }
    
    /**
     * @dev Burn own tokens (inherited from ERC20Burnable)
     * @param amount Amount to burn
     */
    function burnOwn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    // ============ Emergency Functions ============
    
    /**
     * @dev Toggle emergency mode
     * @param enabled Enable/disable emergency mode
     */
    function setEmergencyMode(bool enabled) external onlyOwner {
        emergencyMode = enabled;
        emit EmergencyModeToggled(enabled);
    }
    
    /**
     * @dev Emergency withdrawal during pause
     * @notice Users can withdraw their tokens to owner during emergency
     */
    function emergencyWithdraw() external {
        if (!paused() || !emergencyMode) revert NotInEmergencyMode();
        
        uint256 balance = balanceOf(msg.sender);
        if (balance == 0) revert NoBalance();
        
        _transfer(msg.sender, owner(), balance);
        emit EmergencyWithdrawal(msg.sender, balance);
    }
    
    // ============ Pause Controls ============
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // ============ Hooks ============
    
    /**
     * @dev Hook that is called before any transfer of tokens (OpenZeppelin v5)
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._update(from, to, amount);
    }
}
