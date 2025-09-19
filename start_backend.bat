@echo off
echo Starting HealthBridge Backend...

cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install requirements
echo Installing requirements...
pip install -r requirements.txt

REM Run migrations
echo Running migrations...
python manage.py migrate

REM Create demo users if they don't exist
echo Creating demo users...
python manage.py shell -c "from accounts.models import User; u1, created = User.objects.get_or_create(username='coworker1', defaults={'email': 'coworker1@healthbridge.com', 'role': 'COWORKER', 'first_name': 'Co', 'last_name': 'Worker'}); u1.set_password('demo123'); u1.save(); u2, created = User.objects.get_or_create(username='doctor1', defaults={'email': 'doctor1@healthbridge.com', 'role': 'DOCTOR', 'first_name': 'Dr. John', 'last_name': 'Smith'}); u2.set_password('demo123'); u2.save(); u3, created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@healthbridge.com', 'role': 'ADMIN', 'first_name': 'Admin', 'last_name': 'User', 'is_superuser': True, 'is_staff': True}); u3.set_password('admin123'); u3.save()"

REM Start server
echo Starting Django server...
python manage.py runserver 8000

pause