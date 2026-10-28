@echo off
chcp 65001 >nul
echo ========================================================
echo   SpendWise - Mobile APK Push & Auto-Installer
echo ========================================================
echo.
echo Checking ADB connection...
adb devices
echo.
echo Waiting for device (Make sure USB Debugging is ON)...
adb wait-for-device
echo Device detected! Installing SpendWise.apk...
adb install -r -d "%~dp0SpendWise.apk"
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] SpendWise installed successfully on your phone!
    echo Launching SpendWise...
    adb shell monkey -p com.spendwise.spendwise -c android.intent.category.LAUNCHER 1
) else (
    echo.
    echo [ERROR] Installation failed. Please ensure your phone is unlocked and "Allow USB Debugging" is accepted.
)
echo.
pause
