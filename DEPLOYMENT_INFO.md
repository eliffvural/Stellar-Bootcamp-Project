# 🚀 Deployment Bilgileri - Stellar Calculator Contract

Bu dosya, projenin build ve deployment sürecinde oluşturulan tüm önemli ID ve bilgileri içerir.

## 📦 Build Bilgileri

### Build Tarihi
- **Tarih**: 2024-12-19 (Build zamanı)
- **Build Durumu**: ✅ Başarılı
- **Test Durumu**: ✅ 17/17 test geçti

### Contract Bilgileri
- **Contract Adı**: calculator
- **Contract Versiyonu**: 0.0.0
- **Wasm Dosya Yolu**: `calculator/target/wasm32v1-none/release/calculator.wasm`
- **Wasm Hash**: `9b64c5b67a8b8bda2a85ee330de778fcfd053b7a847d3ebb8cd97ed1f075ef97`

### Exported Fonksiyonlar (12 adet)
1. `abs` - Mutlak değer
2. `add` - Toplama
3. `decrement` - 1 azaltma
4. `divide` - Bölme
5. `get_value` - Mevcut değeri okuma
6. `increment` - 1 artırma
7. `initialize` - Başlangıç değeri ayarlama
8. `modulo` - Mod işlemi
9. `multiply` - Çarpma
10. `power` - Üs alma
11. `reset` - Sıfırlama
12. `subtract` - Çıkarma

## 🚀 Hızlı Deployment

### Otomatik Deployment Script'leri

Proje kök dizininde iki deployment script'i bulunmaktadır:

1. **deploy.ps1** (PowerShell) - İnteraktif deployment script'i
2. **deploy.bat** (Windows Batch) - Basit deployment script'i

**Kullanım:**
```powershell
# PowerShell script'i
.\deploy.ps1

# Veya Batch script'i
deploy.bat
```

Bu script'ler sizi adım adım yönlendirir ve gerekli bilgileri sorar.

## 🌐 Manuel Deployment Komutları

### Testnet Deployment
```bash
cd calculator/contracts/calculator
stellar contract deploy \
  --wasm ..\..\target\wasm32v1-none\release\calculator.wasm \
  --source-account YOUR_SOURCE_ACCOUNT \
  --network testnet
```

**Windows için:**
```cmd
cd calculator\contracts\calculator
stellar contract deploy --wasm ..\..\target\wasm32v1-none\release\calculator.wasm --source-account YOUR_SOURCE_ACCOUNT --network testnet
```

**Not**: `YOUR_SOURCE_ACCOUNT` yerine aşağıdakilerden birini kullanabilirsiniz:
- Bir identity (örn: `--source alice`)
- Public key (örn: `--source GDKW...`)
- Secret key (örn: `--source SC36...`)
- Seed phrase (örn: `--source "kite urban..."`)
- `--sign-with-lab` (Stellar Laboratory ile imzalama)
- `--sign-with-ledger` (Ledger cüzdan ile imzalama)

### Local Deployment
```bash
cd calculator/contracts/calculator
stellar contract deploy \
  --wasm ..\..\target\wasm32v1-none\release\calculator.wasm \
  --source-account YOUR_SOURCE_ACCOUNT \
  --local
```

**Windows için:**
```cmd
cd calculator\contracts\calculator
stellar contract deploy --wasm ..\..\target\wasm32v1-none\release\calculator.wasm --source-account YOUR_SOURCE_ACCOUNT --local
```

### Mainnet Deployment
```bash
cd calculator/contracts/calculator
stellar contract deploy \
  --wasm ..\..\target\wasm32v1-none\release\calculator.wasm \
  --source-account YOUR_SOURCE_ACCOUNT \
  --network mainnet
```

**Windows için:**
```cmd
cd calculator\contracts\calculator
stellar contract deploy --wasm ..\..\target\wasm32v1-none\release\calculator.wasm --source-account YOUR_SOURCE_ACCOUNT --network mainnet
```

## 📝 Contract ID'ler

### Testnet Contract ID
```
CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC
```

**Explorer Link**: https://stellar.expert/explorer/testnet/contract/CCZOQPRYXTGACXCHBDZQUBDHPIVMCI7UKML37UIZLFCVMU2EGW5MBSNC

**Deploy Transaction**: https://stellar.expert/explorer/testnet/tx/7b3197288431be0bfd913b76cfb9c7c0865427f39a074dc0d9d987681fa66521

**Deploy Tarihi**: 2024-12-19

### Local Contract ID
```
[Local deploy sonrası buraya yazılacak]
```

### Mainnet Contract ID
```
[Mainnet deploy sonrası buraya yazılacak]
```

## 🔧 Deployment Sonrası Adımlar

1. **Contract ID'yi Kaydedin**
   - Deploy komutu çalıştıktan sonra çıkan Contract ID'yi yukarıdaki ilgili bölüme yazın
   - Frontend'de kullanmak için bu ID'ye ihtiyacınız olacak

2. **Frontend'i Güncelleyin**
   - `frontend/app.js` dosyasındaki `CONTRACT_CONFIG.contractId` değerini güncelleyin
   - Veya URL parametresi olarak kullanın: `http://localhost:8000/?contract=YOUR_CONTRACT_ID`

3. **Test Edin**
   - Frontend'i açın: `cd frontend && python -m http.server 8000`
   - Freighter wallet'ı bağlayın
   - Contract ID'yi girin
   - İşlemleri test edin

## 📊 Build İstatistikleri

- **Rust Versiyonu**: 1.70+
- **Soroban SDK Versiyonu**: 23.0.2
- **Wasm Boyutu**: 3KB (gerçek boyut)
- **Build Süresi**: ~1-2 dakika
- **Test Süresi**: ~2 dakika
- **Toplam Test Sayısı**: 17
- **Başarılı Test**: 17
- **Başarısız Test**: 0

## 🔐 Güvenlik Notları

- ✅ Integer overflow koruması aktif
- ✅ Division by zero kontrolü var
- ✅ Modulo by zero kontrolü var
- ✅ Negatif üs kontrolü var
- ✅ Saturating aritmetik kullanılıyor

## 📚 Faydalı Komutlar

### Contract'ı Invoke Etme
```bash
# Initialize
stellar contract invoke \
  --id YOUR_CONTRACT_ID \
  --source-account YOUR_SOURCE_ACCOUNT \
  --network testnet \
  -- initialize --init_value 10

# Get Value
stellar contract invoke \
  --id YOUR_CONTRACT_ID \
  --source-account YOUR_SOURCE_ACCOUNT \
  --network testnet \
  -- get_value

# Add
stellar contract invoke \
  --id YOUR_CONTRACT_ID \
  --source-account YOUR_SOURCE_ACCOUNT \
  --network testnet \
  -- add --value 5
```

### Contract Bilgilerini Görüntüleme
```bash
stellar contract read \
  --id YOUR_CONTRACT_ID \
  --network testnet
```

## 🌍 Network Bilgileri

### Testnet
- **RPC URL**: https://soroban-testnet.stellar.org
- **Network Passphrase**: Test SDF Network ; September 2015
- **Horizon URL**: https://horizon-testnet.stellar.org

### Mainnet
- **RPC URL**: https://soroban-rpc.mainnet.stellar.org
- **Network Passphrase**: Public Global Stellar Network ; September 2015
- **Horizon URL**: https://horizon.stellar.org

### Local
- **RPC URL**: http://localhost:8000/soroban/rpc
- **Network Passphrase**: Local Network

## 📞 Destek

Sorularınız için:
- GitHub Issues
- Stellar Discord
- Soroban Documentation: https://soroban.stellar.org

---

**Son Güncelleme**: 2024-12-19

