# Calculator Soroban Contract

Bu proje, Soroban için basit bir hesap makinesi (calculator) smart contract'ı içerir.

## 📋 Özellikler

Bu contract aşağıdaki işlevleri sunar:

### Temel İşlemler
- **initialize**: Başlangıç değeri ayarlama
- **get_value**: Mevcut değeri okuma
- **reset**: Değeri sıfırlama

### Aritmetik İşlemler
- **increment**: Değeri 1 artırma
- **decrement**: Değeri 1 azaltma
- **add**: Belirtilen değeri ekleme
- **subtract**: Belirtilen değeri çıkarma
- **multiply**: Değeri belirtilen sayıyla çarpma
- **divide**: Değeri belirtilen sayıya bölme
- **modulo**: Değerin belirtilen sayıya göre modunu alma (kalan)

### Matematiksel Fonksiyonlar
- **power**: Değeri belirtilen üsse yükseltme
- **abs**: Değerin mutlak değerini alma

### Hata Kontrolü
- Division by zero (sıfıra bölme) kontrolü
- Modulo by zero (sıfıra mod) kontrolü
- Negatif üs kontrolü
- Overflow koruması (saturating aritmetik)

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

### Kullanım Örnekleri

#### Basit Aritmetik
```bash
# Başlangıç değeri ayarla
initialize --init_value 10

# Toplama
add --value 5
# Sonuç: 15

# Çarpma
multiply --value 3
# Sonuç: 45

# Bölme
divide --value 5
# Sonuç: 9
```

#### Matematiksel İşlemler
```bash
# Üs alma
initialize --init_value 2
power --exponent 3
# Sonuç: 8

# Modulo
initialize --init_value 17
modulo --value 5
# Sonuç: 2

# Mutlak değer
initialize --init_value -15
abs
# Sonuç: 15
```

## 🧪 Test Sonuçları

Proje toplam **17 test** içerir ve hepsi başarıyla geçer:
- ✅ 12 pozitif test case
- ✅ 5 hata kontrolü testi (panic testleri)

## 📊 Build Bilgileri

- **Wasm Hash**: 9b64c5b67a8b8bda2a85ee330de778fcfd053b7a847d3ebb8cd97ed1f075ef97
- **Exported Functions**: 12
- **Build Status**: ✅ Başarılı

## 🔧 Teknik Detaylar

### Geliştirilen Fonksiyonlar

#### Son Eklenen Özellikler
- **multiply**: Saturating multiplication kullanarak overflow'u önler
- **divide**: Sıfıra bölme kontrolü ile güvenli bölme
- **power**: Üs alma işlemi (pozitif üsler için)
- **abs**: Mutlak değer hesabı
- **modulo**: Mod işlemi

### Güvenlik Özellikleri
- ✅ Integer overflow koruması (saturating aritmetik)
- ✅ Sıfıra bölme kontrolü
- ✅ Sıfıra mod kontrolü
- ✅ Negatif üs kontrolü

### Test Kapsamı
- ✅ Unit testler: 17 adet
- ✅ Error handling testleri: 5 adet
- ✅ Pozitif test case'ler: 12 adet
- ✅ Test coverage: %100

## 📝 Notlar

Bu contract, Soroban Bootcamp projesi için geliştirilmiştir ve temel matematik işlemlerini Soroban blockchain üzerinde güvenli bir şekilde gerçekleştirmek için tasarlanmıştır.

### Gereksinimler
- Rust 1.70+ 
- Stellar CLI Tools
- Soroban SDK 23.0.2

### Lisans

MIT License