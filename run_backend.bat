@echo off
echo Starting SpendWise REST API Backend Server...
cd /d "%~dp0backend"
node server.js
pause
