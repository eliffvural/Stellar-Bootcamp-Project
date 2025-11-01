# 🚀 Quick Start Guide

Bu projeyi 5 dakikada çalıştırmak için rehber.

## 📋 Ön Gereksinimler

1. ✅ **Rust ve Cargo** yüklü
2. ✅ **Stellar CLI** yüklü
3. ✅ **Freighter Wallet** browser extension
4. ✅ Modern web browser

## ⚡ Hızlı Adımlar

### 1️⃣ Contract Build (1 dakika)

```bash
# Contract dizinine gidin
cd calculator\contracts\calculator

# Build edin
stellar contract build

# Test edin
cargo test
```

✅ Beklenen çıktı: `17 tests passed`

### 2️⃣ Local Network Başlat (Local test için)

**Windows:**

```bash
# Yeni bir terminal açın
stellar laboratory --local
```

**Mac/Linux:**

```bash
# Yeni bir terminal açın
stellar laboratory --local
```

Bu local blockchain network'ünü başlatır.

### 3️⃣ Contract Deploy (1 dakika)

```bash
# Birinci terminal (hala calculator içinde)
stellar contract deploy --wasm target\wasm32v1-none\release\calculator.wasm --local
```

📝 **ÖNEMLİ**: Çıkan `Contract ID`'yi kopyalayın! Bu ID'ye ihtiyacınız olacak.

Örnek çıktı:
```
Contract ID: CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2KM
Successfully deployed contract.
```

### 4️⃣ Frontend'i Aç (1 dakika)

```bash
# Ana dizine dönün
cd ..\..\..

# Frontend dizinine gidin
cd frontend

# Basit HTTP server başlatın
python -m http.server 8000
```

✅ Tarayıcıda şunu açın: `http://localhost:8000`

### 5️⃣ Test Et (1 dakika)

1. **Contract ID Girin**: 
   - Sayfadaki "Contract ID" alanına deploy ettiğiniz ID'yi girin
   
2. **Cüzdan Bağla**:
   - "Cüzdan Bağla" butonuna tıklayın
   - Freighter açılır, izin verin

3. **Hesaplama Yapın**:
   - Initialize: 10 değeri girin
   - Add: 5 ekleyin → 15
   - Multiply: 2 ile çarpın → 30
   - Ve daha fazlası...

## 🎯 Senarios

### Senaryo 1: Basit Toplama

```
1. Initialize → 10
2. Add → 5
3. Result → 15
```

### Senaryo 2: Karmaşık İşlemler

```
1. Initialize → 2
2. Power → 3
3. Result → 8
4. Add → 2
5. Result → 10
6. Multiply → 3
7. Result → 30
```

### Senaryo 3: Sıfıra Bölme Testi

```
1. Initialize → 10
2. Divide → 0 (Hata beklenir)
3. Error log görün
```

## 🔧 Troubleshooting

### Problem: "Freighter is not installed"

**Çözüm:**
1. [Freighter.app](https://freighter.app) sitesine gidin
2. Browser extension'ını kurun
3. Sayfayı yenileyin

### Problem: "Contract ID not set"

**Çözüm:**
1. Deploy komutunu tekrar çalıştırın
2. Contract ID'yi kopyalayın
3. Frontend'deki input alanına yapıştırın

### Problem: "Wallet connection refused"

**Çözüm:**
1. Freighter extension'ını açın
2. Local network'i seçin
3. Wallet'i unlock edin
4. Tekrar "Cüzdan Bağla"ya tıklayın

### Problem: Contract çalışmıyor

**Çözüm:**
```bash
# Contract'ı tekrar deploy edin
cd calculator\contracts\calculator
stellar contract deploy --wasm target\wasm32v1-none\release\calculator.wasm --local

# Yeni Contract ID'yi alın
```

## 🎓 Sonraki Adımlar

Artık projeyi çalıştırdığınıza göre:

1. ✅ **Frontend'i Keşfedin**: `frontend/README.md`
2. ✅ **Contract'ı İnceleyin**: `calculator/README.md`
3. ✅ **Kodlara Bakın**: 
   - `frontend/app.js` - Frontend mantığı
   - `calculator/contracts/calculator/src/lib.rs` - Contract kodu
4. ✅ **Testleri İnceleyin**: `calculator/contracts/calculator/src/test.rs`

## 🌐 Testnet'e Deploy

Local test başarılıysa, testnet'e deploy edin:

```bash
# Build et
stellar contract build

# Testnet'e deploy et
stellar contract deploy --wasm target\wasm32v1-none\release\calculator.wasm --network testnet

# Contract ID'yi alın ve saklayın
```

Sonra Freighter'da "Futurenet" veya "Testnet" seçin ve aynı adımları takip edin.

## 📊 Proje İstatistikleri

- 📜 **Contract**: 12 fonksiyon, 133 satır
- 🎨 **Frontend**: 3 dosya, ~500 satır
- ✅ **Tests**: 17 test, %100 başarılı
- 📦 **Wasm Size**: ~150KB
- ⚡ **Build Time**: ~5 saniye

## 🎉 Başarı!

Artık Stellar blockchain üzerinde matematik işlemleri yapabilirsiniz!

**Notlar:**
- Her işlem blockchain'de kaydedilir
- Gas ücreti ödenir (local'de ücretsiz)
- İşlem geçmişi kalıcıdır

---

**Sorularınız mı var?** 
- GitHub Issues açın
- Community'de sorun
- Docs'u okuyun

**Happy Hashing! 🚀**

