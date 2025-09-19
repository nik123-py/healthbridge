@echo off
echo Starting HealthBridge Project...
echo ================================

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python manage.py runserver 127.0.0.1:8000"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Waiting 5 seconds for frontend to start...
timeout /t 5 /nobreak >nul

echo.
echo Opening application in browser...
start http://localhost:3000

echo.
echo HealthBridge is starting up!
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000 (or 3001/3002 if 3000 is busy)
echo.
echo Demo Credentials:
echo - Co Worker: coworker1 / demo123
echo - Doctor: doctor1 / demo123
echo - Admin: admin / admin123
echo.
pause
