# Bank of Tierras - $BoT Token Implementation Guide

## 📦 Smart Contracts Created

### 1. BotToken.sol
ERC-20 token with controlled minting/burning
- **Symbol**: $BoT
- **Name**: Bank of Tierras Token
- **Features**:
  - Only Treasury can mint/burn
  - Pausable (emergency)
  - OpenZeppelin security standards

### 2. BotTreasury.sol
Treasury contract with fixed-price backing
- **Price**: 1 $BoT = 0.01 AVAX (fixed)
- **Features**:
  - Buy $BoT with AVAX (2% protocol fee)
  - Redeem $BoT for AVAX (originators only)
  - Whitelist management for originators
  - Fee accumulation and withdrawal

## 🚀 Deployment Steps

### 1. Install Dependencies
```bash
cd contracts
npm install
```

### 2. Configure Environment
Add to `.env`:
```
PRIVATE_KEY=your_private_key_here
SNOWTRACE_API_KEY=your_snowtrace_api_key
```

### 3. Deploy to Fuji Testnet
```bash
npm run deploy:fuji
```

### 4. Deploy to Mainnet (when ready)
```bash
npm run deploy:mainnet
```

### 5. Verify Contracts
```bash
npx hardhat verify --network fuji <BOT_TOKEN_ADDRESS>
npx hardhat verify --network fuji <BOT_TREASURY_ADDRESS> <BOT_TOKEN_ADDRESS>
```

## 🎨 Frontend Integration

### BotWallet Component
Located at: `src/components/BotWallet.jsx`

**Features**:
- Display $BoT and AVAX balances
- Buy $BoT with AVAX
- Redeem $BoT for AVAX (originators only)
- Real-time transaction tracking

**Usage**:
```jsx
import BotWallet from './components/BotWallet';

// In Dashboard
<BotWallet />
```

## 📝 Next Steps

1. **Deploy Contracts** to Fuji testnet
2. **Update Contract Addresses** in BotWallet.jsx
3. **Add BotWallet** to Dashboard navigation
4. **Test Buy/Redeem** flows
5. **Add Originators** to whitelist via admin panel

## 🔐 Security Notes

- Treasury holds all AVAX backing
- Only whitelisted originators can redeem
- 2% fee goes to protocol development
- Emergency pause functionality included
