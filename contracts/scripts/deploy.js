const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying Bank of Tierras Contracts...\n");

    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying with account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    // 1. Deploy BotToken
    console.log("\n📝 Deploying BotToken...");
    const BotToken = await hre.ethers.getContractFactory("BotToken");
    const botToken = await BotToken.deploy();
    await botToken.waitForDeployment();
    const botTokenAddress = await botToken.getAddress();
    console.log("✅ BotToken deployed to:", botTokenAddress);

    // 2. Deploy BotTreasury
    console.log("\n💰 Deploying BotTreasury...");
    const BotTreasury = await hre.ethers.getContractFactory("BotTreasury");
    const botTreasury = await BotTreasury.deploy(botTokenAddress);
    await botTreasury.waitForDeployment();
    const botTreasuryAddress = await botTreasury.getAddress();
    console.log("✅ BotTreasury deployed to:", botTreasuryAddress);

    // 3. Set Treasury in BotToken
    console.log("\n🔗 Connecting contracts...");
    const setTreasuryTx = await botToken.setTreasury(botTreasuryAddress);
    await setTreasuryTx.wait();
    console.log("✅ Treasury set in BotToken");

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📋 DEPLOYMENT SUMMARY");
    console.log("=".repeat(60));
    console.log("BotToken:    ", botTokenAddress);
    console.log("BotTreasury: ", botTreasuryAddress);
    console.log("Network:     ", hre.network.name);
    console.log("=".repeat(60));

    // Save addresses to file
    const fs = require("fs");
    const addresses = {
        network: hre.network.name,
        botToken: botTokenAddress,
        botTreasury: botTreasuryAddress,
        deployedAt: new Date().toISOString()
    };

    fs.writeFileSync(
        `./deployments/${hre.network.name}.json`,
        JSON.stringify(addresses, null, 2)
    );
    console.log(`\n💾 Addresses saved to deployments/${hre.network.name}.json`);

    // Verification instructions
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("\n📝 To verify contracts on Snowtrace, run:");
        console.log(`npx hardhat verify --network ${hre.network.name} ${botTokenAddress}`);
        console.log(`npx hardhat verify --network ${hre.network.name} ${botTreasuryAddress} ${botTokenAddress}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
