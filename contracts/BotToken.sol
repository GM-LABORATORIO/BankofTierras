// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title BotToken
 * @dev Bank of Tierras EcoToken - Environmental utility token for carbon marketplace
 * @notice Only Treasury can mint/burn tokens
 */
contract BotToken is ERC20, Ownable, Pausable {
    address public treasury;
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 1e18; // 1 Billion EcoTokens
    
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    constructor() ERC20("Bank of Tierras EcoToken", "BoT") {}
    
    /**
     * @dev Set Treasury contract address
     */
    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury");
        address oldTreasury = treasury;
        treasury = _treasury;
        emit TreasuryUpdated(oldTreasury, _treasury);
    }
    
    /**
     * @dev Mint tokens (only Treasury)
     */
    function mint(address to, uint256 amount) external whenNotPaused {
        require(msg.sender == treasury, "Only treasury");
        require(to != address(0), "Invalid address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @dev Burn tokens (only Treasury)
     */
    function burn(address from, uint256 amount) external whenNotPaused {
        require(msg.sender == treasury, "Only treasury");
        require(from != address(0), "Invalid address");
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }
    
    /**
     * @dev Public burn (anyone can burn their own tokens)
     */
    function burnOwn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
