// Avalanche C-Chain Mainnet - Production Contracts
export const MAINNET_CONTRACTS = {
    // EcoToken $BoT
    botToken: "0x7c64B68D1dBC384FFbc225226aeCAD478790Fa58",

    // Treasury
    botTreasury: "0xeC6dC92D9E868c4B9c6D27421EA52d426c8e0478",

    // Network
    chainId: 43114,
    networkName: "Avalanche C-Chain",

    // Explorer
    explorerUrl: "https://snowtrace.io"
};

// Contract ABIs (simplified - add full ABI from Remix)
export const BOT_TOKEN_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function setTreasury(address _treasury)",
    "function mint(address to, uint256 amount)",
    "function burn(address from, uint256 amount)",
    "function burnOwn(uint256 amount)",
    "function pause()",
    "function unpause()",
    "function emergencyWithdraw()",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

export const BOT_TREASURY_ABI = [
    "function buyBot(uint256 minBotAmount) payable",
    "function redeemBot(uint256 botAmount)",
    "function setOriginator(address originator, bool status)",
    "function addOriginatorsBatch(address[] calldata originators)",
    "function isOriginator(address) view returns (bool)",
    "function botPriceInAvax() view returns (uint256)",
    "function getTreasuryBalance() view returns (uint256)",
    "function getStats() view returns (uint256, uint256, uint256, uint256, uint256, uint256)",
    "function withdrawFees(address payable to)",
    "function setBotPrice(uint256 newPrice)",
    "function setProtocolFee(uint256 newFeePercent)",
    "function setBurnPercent(uint256 newBurnPercent)",
    "function setMultiSig(address _multiSig)",
    "function pause()",
    "function unpause()",
    "event BotPurchased(address indexed buyer, uint256 avaxAmount, uint256 botAmount, uint256 fee)",
    "event BotRedeemed(address indexed originator, uint256 botAmount, uint256 avaxAmount)"
];

// Helper function to get contract instance
export const getContract = (contractName, provider) => {
    const { ethers } = require('ethers');

    if (contractName === 'botToken') {
        return new ethers.Contract(
            MAINNET_CONTRACTS.botToken,
            BOT_TOKEN_ABI,
            provider
        );
    }

    if (contractName === 'botTreasury') {
        return new ethers.Contract(
            MAINNET_CONTRACTS.botTreasury,
            BOT_TREASURY_ABI,
            provider
        );
    }

    throw new Error(`Unknown contract: ${contractName}`);
};

export default MAINNET_CONTRACTS;
