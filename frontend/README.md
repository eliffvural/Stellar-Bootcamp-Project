# 🔢 Stellar Calculator Frontend

Soroban Smart Contract için modern, responsive web frontend uygulaması.

## 🌟 Özellikler

- ✅ **Modern UI/UX**: Gradient renkler ve smooth animasyonlar
- ✅ **Freighter Wallet Entegrasyonu**: Soroban cüzdanı ile kolay bağlantı
- ✅ **Tüm Matematik Operasyonları**: Toplama, çıkarma, çarpma, bölme, üs alma, mod, mutlak değer
- ✅ **Real-time İşlem Geçmişi**: Tüm işlemlerin anlık loglanması
- ✅ **Responsive Design**: Mobil uyumlu
- ✅ **Kolay Kullanım**: Contract ID ile anında bağlan

## 🚀 Hızlı Başlangıç

### 1. Freighter Wallet Kurulumu

Frontend'i kullanmak için Freighter wallet extension'ını kurmanız gerekiyor:

- **Chrome**: [Freighter Extension](https://chrome.google.com/webstore)
- **Firefox**: [Freighter Extension](https://addons.mozilla.org/)
- **Websitesi**: [freighter.app](https://freighter.app)

### 2. Contract'ı Deploy Edin

```bash
cd calculator/contracts/calculator

# Contract'ı build edin
stellar contract build

# Local testnet'te deploy edin
stellar contract deploy --wasm target/wasm32v1-none/release/calculator.wasm --network testnet

# Veya local development için
stellar contract deploy --wasm target/wasm32v1-none/release/calculator.wasm --local
```

Deploy sonrası aldığınız Contract ID'yi kopyalayın.

### 3. Frontend'i Açın

#### Yöntem 1: Tarayıcıda Direkt Açın

Contract ID ile birlikte:

```bash
# Windows
start frontend/index.html

# Mac/Linux
open frontend/index.html

# veya tarayıcıda direkt açın
```

**Contract ID eklemek için:**
- Sayfadaki "Contract ID" input alanına ID'yi girin
- VEYA URL'e ekleyin: `index.html?contract=YOUR_CONTRACT_ID`

#### Yöntem 2: Local Server ile Açın (Önerilen)

```bash
# Python 3
cd frontend
python -m http.server 8000

# Node.js
cd frontend
npx serve .

# PHP
cd frontend
php -S localhost:8000
```

Sonra tarayıcıda `http://localhost:8000` açın.

### 4. Kullanıma Başlayın

1. **Contract ID Girin**: Deploy ettiğiniz contract'ın ID'sini input alanına girin
2. **Cüzdan Bağla**: "Cüzdan Bağla" butonuna tıklayın ve Freighter'dan izin verin
3. **Hesaplama Yapın**: Matematik işlemlerini deneyin!

## 📱 Kullanım

### Temel İşlemler

- **Initialize**: Başlangıç değeri ayarlayın
- **Get Value**: Mevcut değeri okuyun
- **Reset**: Değeri sıfırlayın

### Aritmetik İşlemler

- **Add**: Toplama
- **Subtract**: Çıkarma
- **Multiply**: Çarpma
- **Divide**: Bölme
- **Modulo**: Kalan bulma
- **Increment/Decrement**: +1 / -1

### Matematiksel Fonksiyonlar

- **Power**: Üs alma (x^y)
- **Absolute Value**: Mutlak değer

## 🎨 Özelleştirme

### Renkleri Değiştirme

`styles.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #6354CE;
    --secondary-color: #7B68EE;
    --success-color: #22C55E;
    --warning-color: #F59E0B;
    --danger-color: #EF4444;
    /* ... */
}
```

### Network Değiştirme

`app.js` dosyasında CONTRACT_CONFIG objesini düzenleyin:

```javascript
const CONTRACT_CONFIG = {
    contractId: '',
    network: 'testnet', // 'local', 'testnet', 'mainnet'
    localRpcUrl: 'http://localhost:8000/soroban/rpc'
};
```

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **HTML5**: Modern semantik yapı
- **CSS3**: Gradient, animasyonlar, flexbox/grid
- **JavaScript (ES6+)**: Async/await, modern syntax
- **Freighter API**: Soroban wallet bağlantısı

### Dosya Yapısı

```
frontend/
├── index.html      # Ana HTML dosyası
├── styles.css      # Stil dosyası
├── app.js          # JavaScript mantığı
└── README.md       # Dokümantasyon
```

### Browser Desteği

- ✅ Chrome/Edge (Son 2 versiyon)
- ✅ Firefox (Son 2 versiyon)
- ✅ Safari (Son 2 versiyon)
- ✅ Opera (Son versiyon)

## 🐛 Sorun Giderme

### Freighter Bulunamıyor

```
❌ Freighter is not installed!
```

**Çözüm**: Freighter wallet extension'ını tarayıcınıza kurun.

### Contract ID Hatalı

```
❌ Contract ID not set!
```

**Çözüm**: Deploy ettiğiniz contract'ın ID'sini girin.

### Wallet Bağlanmıyor

```
❌ Wallet connection refused
```

**Çözüm**: Freighter extension'ında oturum açın ve izin verin.

### Network Hatası

```
❌ Error calling [function]
```

**Çözüm**: 
- Local development için `stellar laboratory` çalıştırın
- Testnet/mainnet için Freighter'da doğru network seçildiğinden emin olun

## 📚 Örnekler

### Local Testnet Kullanımı

```bash
# 1. Local network başlat
stellar laboratory

# 2. Contract deploy
stellar contract deploy --wasm target/wasm32v1-none/release/calculator.wasm --local

# 3. Contract ID'yi kopyala ve frontend'e gir

# 4. Frontend'i aç
cd frontend
python -m http.server 8000
```

### Testnet Kullanımı

```bash
# 1. Contract deploy
stellar contract deploy --wasm target/wasm32v1-none/release/calculator.wasm --network testnet

# 2. Contract ID'yi kopyala

# 3. Frontend aç ve contract ID gir

# 4. Freighter'da testnet network seç
```

## 🤝 Katkıda Bulunma

1. Frontend'i geliştirin
2. Hata bildirin
3. Özellik talebi ekleyin

## 📄 Lisans

MIT License

## 🔗 Linkler

- [Soroban Documentation](https://soroban.stellar.org)
- [Freighter Wallet](https://freighter.app)
- [Stellar Network](https://stellar.org)

