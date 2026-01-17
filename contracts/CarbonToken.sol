// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CarbonToken
 * @dev Fungible tokens representing Tonnes of CO2.
 */
contract CarbonToken is ERC20, ERC20Burnable, Ownable {
    
    event CarbonRetired(address indexed user, uint256 amount, string nitEmpresa, uint256 timestamp);

    constructor(address initialOwner) ERC20("Amazonas Carbon Credit", "AMZ-CO2") Ownable(initialOwner) {}

    /**
     * @dev Only the owner (the DApp/Master admin) can mint new tokens based on project verification.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Retire tokens for tax exemption (DIAN compliance).
     * @param amount The amount of tokens to burn.
     * @param nitEmpresa Colombian Tax ID (NIT) of the company.
     */
    function retireForTaxExemption(uint256 amount, string memory nitEmpresa) public {
        _burn(msg.sender, amount);
        emit CarbonRetired(msg.sender, amount, nitEmpresa, block.timestamp);
    }
}
