@echo off
echo Starting HealthBridge Servers...
echo ================================

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && venv\Scripts\activate && python manage.py runserver 127.0.0.1:8000"

echo.
echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Waiting 5 seconds for servers to start...
timeout /t 5 /nobreak >nul

echo.
echo Opening application in browser...
start http://localhost:3000

echo.
echo Servers started! Check the command windows for any errors.
echo.
echo Demo Credentials:
echo - Co Worker: coworker1 / demo123
echo - Doctor: doctor1 / demo123
echo - Admin: admin / admin123
echo.
pause
