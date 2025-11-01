# 🌟 Stellar Calculator Project

Soroban blockchain üzerinde çalışan tam fonksiyonlu hesap makinesi projesi. Smart contract backend + Modern web frontend.

## 📦 Proje İçeriği

Bu proje iki ana bileşenden oluşur:

1. **📜 Smart Contract Backend** (`calculator/`) - Rust ile yazılmış Soroban contract'ı
2. **🎨 Web Frontend** (`frontend/`) - HTML/CSS/JavaScript ile modern web arayüzü

## 🚀 Hızlı Başlangıç

### Gereksinimler

- **Rust** 1.70+ 
- **Stellar CLI Tools** 
- **Freighter Wallet** extension
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Kurulum

```bash
# 1. Projeyi klonlayın
git clone <repository-url>
cd Stellar-Bootcamp-Project

# 2. Contract'ı build edin
cd calculator/contracts/calculator
stellar contract build

# 3. Testleri çalıştırın
cargo test

# 4. Contract'ı deploy edin
stellar contract deploy --wasm target/wasm32v1-none/release/calculator.wasm --network testnet

# 5. Contract ID'yi kopyalayın
# Deploy sonrası çıkan ID'yi kaydedin
```

### Frontend'i Çalıştırma

```bash
# Backend kök dizinine dönün
cd ../../..

# Frontend'i açın
cd frontend

# Basit HTTP server başlatın
python -m http.server 8000
# VEYA
npx serve .
# VEYA
php -S localhost:8000

# Tarayıcıda açın
# http://localhost:8000
```

## 📚 Detaylı Dokümantasyon

### Smart Contract

[calculator/README.md](calculator/README.md) - Contract dokümantasyonu, fonksiyonlar, testler

**Özellikler:**
- ✅ 12 matematik fonksiyonu
- ✅ 17 comprehensive test
- ✅ Error handling
- ✅ Overflow protection
- ✅ Gas optimized

### Web Frontend

[frontend/README.md](frontend/README.md) - Frontend dokümantasyonu, kurulum, kullanım

**Özellikler:**
- ✅ Modern UI/UX
- ✅ Freighter wallet entegrasyonu
- ✅ Responsive design
- ✅ Real-time işlem logları
- ✅ Mobile friendly

## 🏗️ Proje Yapısı

```
Stellar-Bootcamp-Project/
│
├── calculator/                    # Smart Contract Backend
│   ├── contracts/
│   │   └── calculator/
│   │       ├── src/
│   │       │   ├── lib.rs        # Contract kodu
│   │       │   └── test.rs       # Test dosyaları
│   │       ├── Cargo.toml
│   │       └── Makefile
│   ├── Cargo.toml
│   └── README.md
│
├── frontend/                      # Web Frontend
│   ├── index.html                 # Ana HTML
│   ├── styles.css                 # Stil dosyası
│   ├── app.js                     # JavaScript mantığı
│   └── README.md                  # Frontend dokümantasyonu
│
└── README.md                      # Bu dosya
```

## ✨ Özellikler

### Smart Contract Fonksiyonları

| Fonksiyon | Açıklama | Parametreler |
|-----------|----------|--------------|
| `initialize` | Başlangıç değeri | `i64` |
| `get_value` | Mevcut değer | - |
| `reset` | Sıfırla | - |
| `increment` | +1 | - |
| `decrement` | -1 | - |
| `add` | Toplama | `i64` |
| `subtract` | Çıkarma | `i64` |
| `multiply` | Çarpma | `i64` |
| `divide` | Bölme | `i64` |
| `modulo` | Mod | `i64` |
| `power` | Üs | `i64` |
| `abs` | Mutlak değer | - |

### Frontend Özellikleri

- 🎨 Modern gradient tasarım
- 💳 Freighter wallet entegrasyonu
- 📊 Real-time value display
- 📋 İşlem geçmişi
- 🔄 Smooth animasyonlar
- 📱 Responsive layout

## 🧪 Testler

```bash
cd calculator/contracts/calculator
cargo test
```

**Test Sonuçları:**
- ✅ 17/17 test passed
- ✅ %100 fonksiyon kapsamı
- ✅ Error handling testleri
- ✅ Edge case testleri

## 🔐 Güvenlik

### Contract Güvenlik Özellikleri

- ✅ Integer overflow koruması (saturating aritmetik)
- ✅ Division by zero kontrolleri
- ✅ Modulo by zero kontrolleri
- ✅ Negatif üs kontrolleri
- ✅ Panic yerine graceful error handling

### Frontend Güvenlik

- ✅ Freighter wallet doğrulaması
- ✅ Input validation
- ✅ XSS protection
- ✅ Safe contract call handling

## 📊 Build Bilgileri

**Contract:**
- **Wasm Hash**: 9b64c5b67a8b8bda2a85ee330de778fcfd053b7a847d3ebb8cd97ed1f075ef97
- **Exported Functions**: 12
- **Build Status**: ✅ Success

**Frontend:**
- **Bundle Size**: ~50KB
- **Browser Support**: Modern browsers
- **Network Support**: Local, Testnet, Mainnet

## 🚦 Kullanım Senaryoları

### 1. Local Development

```bash
# Local network başlat
stellar laboratory

# Contract deploy
stellar contract deploy --wasm calculator/target/wasm32v1-none/release/calculator.wasm --local

# Frontend çalıştır
cd frontend && python -m http.server 8000
```

### 2. Testnet Deployment

```bash
# Contract deploy
stellar contract deploy --wasm calculator/target/wasm32v1-none/release/calculator.wasm --network testnet

# Contract ID ile frontend aç
http://localhost:8000/?contract=YOUR_CONTRACT_ID
```

### 3. Mainnet Production

```bash
# Production build
cd calculator/contracts/calculator
stellar contract build --profile release-with-logs

# Deploy
stellar contract deploy --wasm target/wasm32v1-none/release/calculator.wasm --network mainnet
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🙏 Teşekkürler

- Stellar Development Foundation
- Soroban Team
- Freighter Wallet Team
- Stellar Bootcamp

## 📞 İletişim

Sorularınız için:
- GitHub Issues
- Stellar Discord
- Community forums

## 🔗 Faydalı Linkler

- [Soroban Docs](https://soroban.stellar.org)
- [Freighter Wallet](https://freighter.app)
- [Stellar Network](https://stellar.org)
- [Smart Contract Basics](https://soroban.stellar.org/docs/basic-tutorials/hello-world)

## 📈 Roadmap

- [ ] Admin panel
- [ ] Transaction history tracking
- [ ] Multi-contract support
- [ ] API integration
- [ ] Mobile app

---

**Built with ❤️ for Stellar Bootcamp**

*Soroban blockchain üzerinde matematik işlemleri yapmanın en kolay yolu*

