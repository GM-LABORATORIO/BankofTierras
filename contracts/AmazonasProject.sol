// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AmazonasProject
 * @dev Each NFT represents a specific conservation project or land parcel.
 */
contract AmazonasProject is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    
    mapping(uint256 => bool) public isVerified;
    mapping(address => bool) public isAuditor;

    event ProjectMinted(uint256 indexed tokenId, address indexed owner, string tokenURI);
    event ProjectVerified(uint256 indexed tokenId, address indexed auditor);
    event AuditorStatusChanged(address indexed auditor, bool status);

    modifier onlyAuditor() {
        require(isAuditor[msg.sender] || owner() == msg.sender, "Caller is not an auditor");
        _ ;
    }

    constructor(address initialOwner) ERC721("Amazonas Project", "AMZ-NFT") Ownable(initialOwner) {
        isAuditor[initialOwner] = true;
    }

    function setAuditor(address auditor, bool status) public onlyOwner {
        isAuditor[auditor] = status;
        emit AuditorStatusChanged(auditor, status);
    }

    function mintProject(address to, string memory uri) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit ProjectMinted(tokenId, to, uri);
        return tokenId;
    }

    function verifyProject(uint256 tokenId) public onlyAuditor {
        require(_ownerOf(tokenId) != address(0), "Project does not exist");
        isVerified[tokenId] = true;
        emit ProjectVerified(tokenId, msg.sender);
    }

    // Overrides required by Solidity
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
