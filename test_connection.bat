@echo off
echo Testing HealthBridge Connection...
echo ==================================

echo.
echo Testing Backend API...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/auth/login/' -Method POST -ContentType 'application/json' -Body '{\"username\":\"admin\",\"password\":\"admin123\"}'; Write-Host '✅ Backend API is working! Token received.' } catch { Write-Host '❌ Backend API error:' $_.Exception.Message }"

echo.
echo Testing Frontend...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing; Write-Host '✅ Frontend is accessible on port 3000!' } catch { try { $response = Invoke-WebRequest -Uri 'http://localhost:3001' -UseBasicParsing; Write-Host '✅ Frontend is accessible on port 3001!' } catch { try { $response = Invoke-WebRequest -Uri 'http://localhost:3002' -UseBasicParsing; Write-Host '✅ Frontend is accessible on port 3002!' } catch { Write-Host '❌ Frontend error on all ports:' $_.Exception.Message } } }"

echo.
echo Opening application...
start http://localhost:3000

echo.
echo Test completed!
pause
