@echo off
echo ========================================
echo HealthBridge - Starting Servers and Testing
echo ========================================

echo.
echo [1/4] Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && .\venv\Scripts\activate.bat && python manage.py runserver 127.0.0.1:8000"

echo.
echo [2/4] Waiting for backend to start...
timeout /t 8 /nobreak > nul

echo.
echo [3/4] Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo [4/4] Waiting for frontend to start...
timeout /t 10 /nobreak > nul

echo.
echo ========================================
echo Testing Backend Endpoints...
echo ========================================

echo Testing login endpoint...
curl -X POST http://127.0.0.1:8000/api/auth/login/ -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}" 2>nul || echo "Backend not responding"

echo.
echo Testing patients endpoint...
curl -X GET http://127.0.0.1:8000/api/patients/patients/ 2>nul || echo "Patients endpoint not responding"

echo.
echo Testing vitals endpoint...
curl -X GET http://127.0.0.1:8000/api/patients/vitals/ 2>nul || echo "Vitals endpoint not responding"

echo.
echo Testing consultations endpoint...
curl -X GET http://127.0.0.1:8000/api/consultations/consultations/ 2>nul || echo "Consultations endpoint not responding"

echo.
echo ========================================
echo Opening Application...
echo ========================================
start http://localhost:3000

echo.
echo Servers should now be running:
echo - Backend: http://127.0.0.1:8000
echo - Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
