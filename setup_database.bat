@echo off
echo Setting up HealthBridge Database...

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo PostgreSQL is not installed or not in PATH.
    echo Please install PostgreSQL from https://www.postgresql.org/download/
    echo Or the system will fallback to SQLite for development.
    pause
    goto :end
)

REM Create database
echo Creating database...
psql -U postgres -c "CREATE DATABASE healthbridge_db;" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Database might already exist or there was an error.
    echo Please check PostgreSQL connection and credentials.
)

echo Database setup complete!
echo You can now run the backend with: start_backend.bat

:end
pause
