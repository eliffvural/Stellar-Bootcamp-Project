# Stellar Calculator Contract Deployment Script
# Bu script contract'ı testnet'e deploy eder

Write-Host "🚀 Stellar Calculator Contract Deployment" -ForegroundColor Cyan
Write-Host ""

# Contract dizinine git
$contractDir = Join-Path $PSScriptRoot "calculator\contracts\calculator"
$wasmPath = Join-Path $PSScriptRoot "calculator\target\wasm32v1-none\release\calculator.wasm"

# Wasm dosyasının var olduğunu kontrol et
if (-not (Test-Path $wasmPath)) {
    Write-Host "❌ Hata: WASM dosyası bulunamadı: $wasmPath" -ForegroundColor Red
    Write-Host "💡 Önce contract'ı build edin: cd calculator\contracts\calculator && stellar contract build" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ WASM dosyası bulundu: $wasmPath" -ForegroundColor Green
Write-Host ""

# Kullanıcıdan source account bilgisi al
Write-Host "📝 Deploy için source account gerekli." -ForegroundColor Yellow
Write-Host ""
Write-Host "Seçenekler:" -ForegroundColor Cyan
Write-Host "1. Stellar Laboratory ile imzala (--sign-with-lab)"
Write-Host "2. Ledger cüzdan ile imzala (--sign-with-ledger)"
Write-Host "3. Secret key ile (--source-account SC36...)"
Write-Host "4. Public key ile (--source-account GDKW...)"
Write-Host "5. Identity ile (--source-account alice)"
Write-Host ""
$choice = Read-Host "Seçiminiz (1-5)"

$sourceAccount = ""
$signMethod = ""

switch ($choice) {
    "1" {
        $signMethod = "--sign-with-lab"
        $sourceAccount = "temp"
    }
    "2" {
        $signMethod = "--sign-with-ledger"
        $sourceAccount = "temp"
    }
    "3" {
        $sourceAccount = Read-Host "Secret key'i girin (SC36...)"
    }
    "4" {
        $sourceAccount = Read-Host "Public key'i girin (GDKW...)"
    }
    "5" {
        $sourceAccount = Read-Host "Identity adını girin (örn: alice)"
    }
    default {
        Write-Host "❌ Geçersiz seçim!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🌐 Network seçin:" -ForegroundColor Cyan
Write-Host "1. Testnet"
Write-Host "2. Mainnet"
Write-Host "3. Local"
Write-Host ""
$networkChoice = Read-Host "Seçiminiz (1-3)"

$network = ""
switch ($networkChoice) {
    "1" { $network = "testnet" }
    "2" { $network = "mainnet" }
    "3" { $network = "local" }
    default {
        Write-Host "❌ Geçersiz seçim!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🔄 Deploy başlatılıyor..." -ForegroundColor Yellow
Write-Host ""

# Deploy komutunu oluştur
$deployCmd = "stellar contract deploy --wasm `"$wasmPath`" --source-account `"$sourceAccount`" --network $network"

if ($signMethod) {
    $deployCmd += " $signMethod"
}

# Deploy komutunu çalıştır
Write-Host "Komut: $deployCmd" -ForegroundColor Gray
Write-Host ""

Set-Location $contractDir
Invoke-Expression $deployCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deploy başarılı!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 ÖNEMLİ: Çıkan Contract ID'yi DEPLOYMENT_INFO.md dosyasına kaydedin!" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Deploy başarısız!" -ForegroundColor Red
}

