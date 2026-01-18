@echo off
echo Starting HealthBridge Backend Server...
cd backend
python manage.py runserver 127.0.0.1:8000
pause