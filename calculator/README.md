# Calculator Soroban Contract

Bu proje, Soroban için basit bir hesap makinesi (calculator) smart contract'ı içerir.

## 📋 Özellikler

Bu contract aşağıdaki işlevleri sunar:

- **initialize**: Başlangıç değeri ayarlama
- **increment**: Değeri 1 artırma
- **decrement**: Değeri 1 azaltma
- **add**: Belirtilen değeri ekleme
- **subtract**: Belirtilen değeri çıkarma
- **get_value**: Mevcut değeri okuma
- **reset**: Değeri sıfırlama

## 🏗️ Proje Yapısı

```text
.
├── contracts
│   └── calculator
│       ├── src
│       │   ├── lib.rs       # Contract kodu
│       │   └── test.rs      # Test dosyası
│       ├── Cargo.toml
│       └── Makefile
├── Cargo.toml
└── README.md
```

## 🚀 Kullanım

### Testleri Çalıştırma

```bash
cd contracts/calculator
cargo test
```

### Contract'ı Derleme

```bash
cd contracts/calculator
stellar contract build
```

Derlenen WASM dosyası: `target/wasm32v1-none/release/calculator.wasm`

### Deploy ve Invoke

Deploy için:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/calculator.wasm \
  --source alice \
  --network testnet
```

Invoke için:
```bash
stellar contract invoke \
  --id <contract_id> \
  --source alice \
  --network testnet \
  -- initialize --init_value 10
```