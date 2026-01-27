require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        hardhat: {
            chainId: 43114
        },
        fuji: {
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            chainId: 43113,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
        },
        mainnet: {
            url: "https://api.avax.network/ext/bc/C/rpc",
            chainId: 43114,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
        }
    },
    etherscan: {
        apiKey: {
            avalanche: process.env.SNOWTRACE_API_KEY || "",
            avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || ""
        }
    }
};
