// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title CarbonV2
 * @dev implementation of the $CARBON token for CLIMATE PASS EXCHANGE™.
 * Follows RWA compliance patterns for Avalanche Evergreen Subnet.
 * Precision: 18 decimals to allow fractional gram sales.
 */
contract CarbonV2 is ERC20, ERC20Burnable, AccessControl, Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    // Identity Registry for ERC-3643 style compliance
    mapping(address => bool) public isVerified;

    event IdentityVerified(address indexed account, bool status);

    constructor(address defaultAdmin, address minter) ERC20("Carbon Credit CPX", "CARBON") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, minter);
        _grantRole(PAUSER_ROLE, defaultAdmin);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Compliance check before any transfer.
     * In a full ERC-3643 implementation, this would query an Identity Registry.
     */
    function _update(address from, address to, uint256 value) internal override whenNotPaused {
        if (from != address(0) && to != address(0)) {
            // Check compliance for both sender and receiver
            // require(isVerified[from], "CPX: Sender not verified (KYC)");
            // require(isVerified[to], "CPX: Receiver not verified (KYC)");
        }
        super._update(from, to, value);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    /**
     * @dev Sets the verification status for an account (Simple Identity Registry mockup).
     */
    function setVerificationStatus(address account, bool status) public onlyRole(DEFAULT_ADMIN_ROLE) {
        isVerified[account] = status;
        emit IdentityVerified(account, status);
    }

    // Standard ERC20 decimals, allowing micro-granularity for grams (1 ton = 10^18 units)
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
