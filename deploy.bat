@echo off
REM Stellar Calculator Contract Deployment Script (Windows Batch)
REM Bu script contract'ı testnet'e deploy eder

echo.
echo 🚀 Stellar Calculator Contract Deployment
echo.

REM Contract dizinine git
cd calculator\contracts\calculator

REM Wasm dosyasının var olduğunu kontrol et
if not exist ..\..\target\wasm32v1-none\release\calculator.wasm (
    echo ❌ Hata: WASM dosyası bulunamadı!
    echo 💡 Önce contract'ı build edin: cd calculator\contracts\calculator ^&^& stellar contract build
    exit /b 1
)

echo ✅ WASM dosyası bulundu
echo.

REM Basit deploy komutu - kullanıcı kendi source account'unu ekleyecek
echo 📝 Deploy için source account gerekli.
echo.
echo Örnek komut:
echo   stellar contract deploy --wasm ..\..\target\wasm32v1-none\release\calculator.wasm --source-account YOUR_ACCOUNT --network testnet
echo.
echo Veya Stellar Laboratory ile:
echo   stellar contract deploy --wasm ..\..\target\wasm32v1-none\release\calculator.wasm --source-account temp --network testnet --sign-with-lab
echo.

set /p source_account="Source account girin (veya 'lab' için Stellar Laboratory): "

if /i "%source_account%"=="lab" (
    stellar contract deploy --wasm ..\..\target\wasm32v1-none\release\calculator.wasm --source-account temp --network testnet --sign-with-lab
) else (
    set /p network="Network girin (testnet/mainnet/local): "
    stellar contract deploy --wasm ..\..\target\wasm32v1-none\release\calculator.wasm --source-account %source_account% --network %network%
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Deploy başarılı!
    echo.
    echo 📝 ÖNEMLİ: Çıkan Contract ID'yi DEPLOYMENT_INFO.md dosyasına kaydedin!
) else (
    echo.
    echo ❌ Deploy başarısız!
)

pause

