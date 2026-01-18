@echo off
echo Starting HealthBridge Servers...

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && .\venv\Scripts\activate.bat && python manage.py runserver 127.0.0.1:8000"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Waiting 10 seconds for both servers to start...
timeout /t 10 /nobreak > nul

echo.
echo Opening application in browser...
start http://localhost:3000

echo.
echo Both servers should now be running:
echo - Backend: http://127.0.0.1:8000
echo - Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
