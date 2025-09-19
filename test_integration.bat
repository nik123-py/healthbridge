@echo off
echo HealthBridge Integration Test
echo ============================

echo.
echo Testing Backend API...
echo.

REM Test login endpoint
echo Testing login endpoint...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8000/api/auth/login/' -Method POST -ContentType 'application/json' -Body '{\"username\":\"admin\",\"password\":\"admin123\"}'; Write-Host 'Login successful! Token received.' } catch { Write-Host 'Login failed:' $_.Exception.Message }"

echo.
echo Testing patient list endpoint...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8000/api/patients/patients/' -Method GET -Headers @{'Authorization'='Bearer YOUR_TOKEN_HERE'}; Write-Host 'Patient list endpoint accessible.' } catch { Write-Host 'Patient endpoint test failed:' $_.Exception.Message }"

echo.
echo Testing frontend...
echo Opening frontend in browser...
start http://localhost:3000

echo.
echo Integration test completed!
echo.
echo Manual Testing Steps:
echo 1. Open http://localhost:3000 in your browser
echo 2. Login with admin/admin123
echo 3. Test patient registration
echo 4. Test vitals entry
echo 5. Test dashboard functionality
echo.
pause
