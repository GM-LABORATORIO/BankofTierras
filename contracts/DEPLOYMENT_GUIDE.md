# Bank of Tierras - Smart Contracts Deployment Guide

## 📋 Contract Specifications

### BotToken.sol
- **Symbol**: $BoT
- **Name**: Bank of Tierras EcoToken
- **Max Supply**: 1,000,000,000 (1 Billion)
- **Decimals**: 18
- **Standard**: ERC-20

### BotTreasury.sol
- **Initial Price**: 0.001 AVAX (~$0.012 USD)
- **Protocol Fee**: 3%
- **Burn Rate**: 1% on carbon purchases
- **Market Price**: Disabled (can be enabled later)

## 💰 Fee Structure

| Acción | Fee | Destino |
|--------|-----|---------|
| Compra de $BoT EcoToken | 3% | Protocolo (desarrollo) |
| Compra de $CARBON | 10% | Protocolo (operaciones) |
| Adopciones de Especies | 0% | 100% al Originador |
| Donaciones | 0% | 100% al Originador |

**Filosofía**: Cobramos en transacciones comerciales ($BoT, $CARBON), pero adopciones y donaciones son GRATIS para maximizar impacto ambiental.

## 🚀 Deployment Steps (Remix)

### 1. Prepare Remix
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create new workspace: "BankOfTierras"
3. Install OpenZeppelin:
   - File Explorer → "+" → Create folder `@openzeppelin`
   - Import from GitHub: `@openzeppelin/contracts@5.0.1`

### 2. Upload Contracts
1. Copy `BotToken.sol` to Remix
2. Copy `BotTreasury.sol` to Remix
3. Compile both (Solidity 0.8.20)

### 3. Deploy BotToken
```
1. Select "BotToken" contract
2. Environment: "Injected Provider - MetaMask"
3. Network: Avalanche C-Chain (43114)
4. Click "Deploy"
5. Confirm in MetaMask
6. Copy deployed address
```

### 4. Deploy BotTreasury
```
1. Select "BotTreasury" contract
2. Constructor parameter: <BotToken_Address>
3. Click "Deploy"
4. Confirm in MetaMask
5. Copy deployed address
```

### 5. Connect Contracts
```
1. In BotToken contract:
   - Call setTreasury(<BotTreasury_Address>)
   - Confirm transaction
```

### 6. Verify on Snowtrace
```
1. Go to snowtrace.io
2. Search your contract address
3. Click "Verify & Publish"
4. Compiler: 0.8.20
5. Optimization: Yes (200 runs)
6. Paste flattened source code
```

## 🔧 Post-Deployment Configuration

### Add Initial Originators
```javascript
// In BotTreasury contract
setOriginator("0xOriginatorWallet1", true)
setOriginator("0xOriginatorWallet2", true)

// Or batch add
addOriginatorsBatch([
  "0xOriginator1",
  "0xOriginator2",
  "0xOriginator3"
])
```

### Test Buy Flow
```javascript
// Send 0.1 AVAX to buyBot()
// Should receive ~97 $BoT EcoTokens (after 3% fee)
// 0.1 AVAX * 0.97 / 0.001 = 97 $BoT
```

### Test Redeem Flow (as Originator)
```javascript
// Call redeemBot(97000000000000000000) // 97 $BoT
// Should receive ~0.097 AVAX back
```

## 📊 Contract Addresses (Update after deploy)

```json
{
  "network": "Avalanche Mainnet",
  "chainId": 43114,
  "contracts": {
    "BotToken": "0x...",
    "BotTreasury": "0x..."
  },
  "deployedAt": "2026-01-26",
  "deployer": "0x..."
}
```

## 🔐 Security Checklist

- [x] Max supply enforced (1B)
- [x] Only Treasury can mint
- [x] Reentrancy guards on all payable functions
- [x] Pausable for emergencies
- [x] Ownership transferable
- [x] Fee limits (max 10%)
- [x] Burn limits (max 5%)
- [x] Integer overflow protection (Solidity 0.8+)

## 🎯 Frontend Integration

Update `BotWallet.jsx`:
```javascript
const BOT_TOKEN_ADDRESS = "0x..."; // From deployment
const BOT_TREASURY_ADDRESS = "0x..."; // From deployment
```

## 📝 Important Functions

### For Users
- `buyBot()` - Purchase $BoT EcoTokens with AVAX
- `botToken.balanceOf(address)` - Check balance

### For Originators
- `redeemBot(amount)` - Convert $BoT to AVAX

### For Admin
- `setOriginator(address, bool)` - Manage whitelist
- `setBotPrice(uint256)` - Update price (if needed)
- `withdrawFees(address)` - Collect protocol fees
- `enableMarketPrice()` - Switch to DEX pricing (irreversible)

## 🚨 Emergency Procedures

### Pause Contracts
```javascript
// In case of exploit or bug
botToken.pause()
botTreasury.pause()
```

### Unpause
```javascript
botToken.unpause()
botTreasury.unpause()
```

## 📈 Monitoring

Track these metrics:
- Total $BoT EcoTokens sold
- Total AVAX received
- Total $BoT burned
- Number of originators
- Treasury balance
- Accumulated fees

Use `getStats()` function for dashboard.

## 🌍 EcoToken Branding

Remember to use "EcoToken" in all marketing materials:
- "Compra $BoT EcoTokens"
- "El primer EcoToken de Colombia"
- "EcoToken respaldado por conservación real"
