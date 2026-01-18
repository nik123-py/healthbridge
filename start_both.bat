@echo off
echo Starting HealthBridge Application...
echo.
echo Starting Backend Server...
start "HealthBridge Backend" cmd /k "cd backend && python manage.py runserver 127.0.0.1:8000"
echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend Server...
start "HealthBridge Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo.
echo Demo Login Credentials:
echo Admin: admin / admin123
echo Doctor: doctor1 / demo123
echo Co-worker: coworker1 / demo123
echo.
pause
