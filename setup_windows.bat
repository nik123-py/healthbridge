@echo off
echo HealthBridge Setup for Windows
echo =============================

REM Check Python installation
python --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

REM Check Node.js installation
node --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
)

echo Python and Node.js are installed. Proceeding with setup...

REM Setup Backend
echo.
echo Setting up Backend...
cd backend

REM Create virtual environment
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Run migrations
echo Running database migrations...
python manage.py migrate

REM Create demo users
echo Creating demo users...
python manage.py shell -c "from accounts.models import User; u1, created = User.objects.get_or_create(username='coworker1', defaults={'email': 'coworker1@healthbridge.com', 'role': 'COWORKER', 'first_name': 'Co', 'last_name': 'Worker'}); u1.set_password('demo123'); u1.save(); u2, created = User.objects.get_or_create(username='doctor1', defaults={'email': 'doctor1@healthbridge.com', 'role': 'DOCTOR', 'first_name': 'Dr. John', 'last_name': 'Smith'}); u2.set_password('demo123'); u2.save(); u3, created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@healthbridge.com', 'role': 'ADMIN', 'first_name': 'Admin', 'last_name': 'User', 'is_superuser': True, 'is_staff': True}); u3.set_password('admin123'); u3.save()"

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

REM Install Node.js dependencies
echo Installing Node.js dependencies...
npm install

cd ..

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Run start_backend.bat to start the backend server
echo 2. Run start_frontend.bat to start the frontend server
echo.
echo Access URLs:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8000
echo - Admin Panel: http://localhost:8000/admin
echo.
echo Demo Credentials:
echo - Co Worker: coworker1 / demo123
echo - Doctor: doctor1 / demo123
echo - Admin: admin / admin123
echo.
pause