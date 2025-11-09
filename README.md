# Stellar Calculator Platform

A fully on-chain calculator platform built on Stellar/Soroban. Users can perform mathematical operations, track values, and manage calculations — all on-chain with no local dependencies.

## 🎯 Project Overview

This is a hackathon-ready implementation featuring:

- **Calculator Contract**: Perform 12 mathematical operations on-chain
- **Modern Frontend**: HTML/CSS/JavaScript frontend with Freighter wallet integration
- **Real-time Tracking**: Track calculation history and current values
- **Secure Operations**: Built-in overflow protection and error handling

## 🚀 Deployment Guide

### Contract IDs

| Contract | Contract ID | Status |
|----------|-------------|--------|
| Calculator | `CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC` | ✅ Deployed & Ready |

**Explorer links:**
- Calculator: [https://stellar.expert/explorer/testnet/contract/CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC](https://stellar.expert/explorer/testnet/contract/CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC)

### Environment Variables

Frontend uses URL parameters or localStorage for contract configuration. You can also create a `frontend/.env` file (optional):

```env
VITE_CONTRACT_ID=CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC
VITE_NETWORK=testnet
VITE_RPC_URL=https://soroban-testnet.stellar.org
```

After any change, restart the frontend server:

```bash
cd frontend
python -m http.server 8000
# or
npx serve .
```

## 📦 Deployment Steps

1. **Build contracts**: 
   ```bash
   cd calculator/contracts/calculator
   stellar contract build
   ```

2. **Run tests**:
   ```bash
   cargo test
   ```

3. **Deploy contract using Stellar CLI** (see below)

4. **Update frontend with contract ID**:
   - Enter contract ID in the frontend input field: `CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC`
   - Or use URL parameter: `http://localhost:8000/?contract=CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC`

5. **Start frontend**:
   ```bash
   cd frontend
   python -m http.server 8000
   ```

## Example CLI Commands

### Deploy Calculator Contract:

**Testnet:**
```bash
cd calculator/contracts/calculator
stellar contract deploy \
  --wasm ..\..\target\wasm32v1-none\release\calculator.wasm \
  --source-account YOUR_SECRET_KEY \
  --network testnet
```

**With Stellar Laboratory (signing):**
```bash
stellar contract deploy \
  --wasm ..\..\target\wasm32v1-none\release\calculator.wasm \
  --source-account temp \
  --network testnet \
  --sign-with-lab
```

**Local:**
```bash
stellar contract deploy \
  --wasm ..\..\target\wasm32v1-none\release\calculator.wasm \
  --source-account YOUR_SECRET_KEY \
  --local
```

### Initialize Calculator:

The calculator contract doesn't require initialization. You can start using it immediately after deployment.

**Set initial value:**
```bash
stellar contract invoke \
  --id CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC \
  --source-account YOUR_SECRET_KEY \
  --network testnet \
  -- initialize --init_value 10
```

### Example Contract Invocations:

**Get current value:**
```bash
stellar contract invoke \
  --id CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC \
  --source-account YOUR_SECRET_KEY \
  --network testnet \
  -- get_value
```

**Add value:**
```bash
stellar contract invoke \
  --id CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC \
  --source-account YOUR_SECRET_KEY \
  --network testnet \
  -- add --value 5
```

**Multiply:**
```bash
stellar contract invoke \
  --id CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC \
  --source-account YOUR_SECRET_KEY \
  --network testnet \
  -- multiply --value 3
```

**Power (exponentiation):**
```bash
stellar contract invoke \
  --id CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC \
  --source-account YOUR_SECRET_KEY \
  --network testnet \
  -- power --exponent 2
```

## 🛠️ Troubleshooting

- **Make sure you have enough XLM in your account** for transaction fees
- **Check that WASM files were built successfully**: Verify `calculator/target/wasm32v1-none/release/calculator.wasm` exists
- **Verify network connection to testnet**: Test with `stellar contract read` command
- **Check contract IDs and admin addresses**: Ensure contract ID is correct in frontend
- **Restart frontend after updating contract ID**: Clear browser cache if needed
- **Freighter wallet not detected**: Install [Freighter extension](https://freighter.app) and refresh page
- **Contract calls failing**: Verify you're connected to the correct network (testnet/mainnet/local)

## 📊 Contract Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `initialize` | Set initial value | `init_value: i64` |
| `get_value` | Get current value | - |
| `reset` | Reset to zero | - |
| `increment` | Add 1 | - |
| `decrement` | Subtract 1 | - |
| `add` | Add value | `value: i64` |
| `subtract` | Subtract value | `value: i64` |
| `multiply` | Multiply by value | `value: i64` |
| `divide` | Divide by value | `value: i64` |
| `modulo` | Modulo operation | `value: i64` |
| `power` | Raise to power | `exponent: i64` |
| `abs` | Absolute value | - |

## 🔐 Security Features

- ✅ Integer overflow protection (saturating arithmetic)
- ✅ Division by zero checks
- ✅ Modulo by zero checks
- ✅ Negative exponent checks
- ✅ Graceful error handling

## 📈 Build Information

- **Wasm Hash**: `9b64c5b67a8b8bda2a85ee330de778fcfd053b7a847d3ebb8cd97ed1f075ef97`
- **Wasm Size**: 3KB
- **Exported Functions**: 12
- **Test Coverage**: 17/17 tests passed
- **Soroban SDK**: 23.0.2

## 🧪 Testing

Run tests:
```bash
cd calculator/contracts/calculator
cargo test
```

**Test Results:**
- ✅ 17/17 tests passed
- ✅ 100% function coverage
- ✅ Error handling tests included
- ✅ Edge case tests included

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔗 Useful Links

- [Soroban Documentation](https://soroban.stellar.org)
- [Freighter Wallet](https://freighter.app)
- [Stellar Network](https://stellar.org)
- [Smart Contract Basics](https://soroban.stellar.org/docs/basic-tutorials/hello-world)
- [DEPLOYMENT_INFO.md](./DEPLOYMENT_INFO.md) - Detailed deployment information

## 📚 Additional Documentation

- [DEPLOYMENT_INFO.md](./DEPLOYMENT_INFO.md) - Complete deployment guide and contract IDs
- [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) - Build summary and statistics
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [calculator/README.md](./calculator/README.md) - Contract documentation
- [frontend/README.md](./frontend/README.md) - Frontend documentation

---

**Built for Stellar Bootcamp 🚀 Fully On-Chain | No Local Dependencies | Community-Driven**
