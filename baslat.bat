@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
set NODE_OPTIONS=--use-system-ca

echo.
echo  Baris Oker - Gecici Yayin Baslatiliyor...
echo.

where npm >nul 2>&1
if errorlevel 1 (
  echo HATA: Node.js bulunamadi. https://nodejs.org adresinden kurun.
  pause
  exit /b 1
)

set "CLOUDFLARED=C:\Program Files (x86)\cloudflared\cloudflared.exe"
if not exist "%CLOUDFLARED%" (
  echo HATA: cloudflared bulunamadi.
  echo winget install Cloudflare.cloudflared --source winget
  pause
  exit /b 1
)

echo [1/2] Dev sunucu baslatiliyor...
start "Baris Oker - Dev" cmd /k "cd /d %~dp0 && set PATH=C:\Program Files\nodejs;%PATH% && set NODE_OPTIONS=--use-system-ca && npm run dev"

echo [2/2] Tunnel bekleniyor (12 sn)...
timeout /t 12 /nobreak >nul

echo Tunnel baslatiliyor...
start "Baris Oker - Tunnel" cmd /k ""%CLOUDFLARED%" tunnel --url http://localhost:3000"

echo.
echo ================================================
echo   Yerel:  http://localhost:3000
echo   Admin:  http://localhost:3000/admin/login
echo.
echo   Telefon icin: Tunnel penceresindeki
echo   https://....trycloudflare.com linkini kopyalayin
echo ================================================
echo.
echo Bu pencereleri kapatmayin - site acik kalsin.
echo.
pause
