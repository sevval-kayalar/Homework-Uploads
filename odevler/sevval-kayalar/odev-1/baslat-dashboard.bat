@echo off
cd /d "%~dp0"
echo Dashboard aciliyor: http://localhost:8000/dashboard/
start "" "http://localhost:8000/dashboard/"
python -m http.server 8000
pause
