# 🏥 HealthBridge: An Offline-First Telehealth Platform

A complete telehealth platform designed for rural healthcare delivery, featuring Django REST API backend and React PWA frontend with offline capabilities.

## 🌟 Features

- **Role-based Authentication**: Co workers, Doctors, and Administrators
- **Patient Management**: Complete registration and profile management
- **Vitals Recording**: Blood pressure, heart rate, temperature, weight, height
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Modern UI**: Built with Shadcn-ui components and Tailwind CSS
- **API Integration**: Full REST API connectivity
- **Offline Support**: PWA capabilities for rural areas

## 📁 Project Structure

```
healthbridge/
├── backend/                    # Django REST API
│   ├── manage.py              # Django management
│   ├── requirements.txt       # Python dependencies
│   ├── db.sqlite3            # SQLite database
│   ├── healthbridge_saathi/  # Django project settings
│   ├── accounts/             # User authentication
│   ├── patients/             # Patient management
│   ├── consultations/        # Consultation system
│   └── sync/                 # Data synchronization
├── frontend/                  # React PWA
│   ├── package.json          # Node dependencies
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/           # Application pages
│   │   └── lib/             # Utilities and API client
│   └── public/
├── start_backend.bat         # Windows backend starter
├── start_frontend.bat        # Windows frontend starter
└── setup_windows.bat         # Windows setup script
```

## 🚀 Windows Setup Instructions

### Prerequisites

1. **Python 3.8+**: Download from [python.org](https://python.org)
2. **Node.js 16+**: Download from [nodejs.org](https://nodejs.org)
3. **Git**: Download from [git-scm.com](https://git-scm.com)

### Quick Setup (Automated)

1. **Extract the project** to `C:\Users\05nik\healthbridge`
2. **Run the setup script**:
   ```cmd
   cd "C:\Users\05nik\healthbridge"
   setup_windows.bat
   ```

### Manual Setup

1. **Backend Setup**:
   ```cmd
   cd "C:\Users\05nik\healthbridge\backend"
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py shell -c "from accounts.models import User; u1, created = User.objects.get_or_create(username='coworker1', defaults={'email': 'coworker1@healthbridge.com', 'role': 'COWORKER', 'first_name': 'Co', 'last_name': 'Worker'}); u1.set_password('demo123'); u1.save(); u2, created = User.objects.get_or_create(username='doctor1', defaults={'email': 'doctor1@healthbridge.com', 'role': 'DOCTOR', 'first_name': 'Dr. John', 'last_name': 'Smith'}); u2.set_password('demo123'); u2.save(); u3, created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@healthbridge.com', 'role': 'ADMIN', 'first_name': 'Admin', 'last_name': 'User', 'is_superuser': True, 'is_staff': True}); u3.set_password('admin123'); u3.save()"
   ```

2. **Frontend Setup**:
   ```cmd
   cd "C:\Users\05nik\healthbridge\frontend"
   npm install
   ```

## 🎯 Running the Application

### Method 1: Using Batch Files (Recommended)
1. **Start Backend**: Double-click `start_backend.bat`
2. **Start Frontend**: Double-click `start_frontend.bat`

### Method 2: Manual Commands
1. **Backend Server**:
   ```cmd
   cd backend
   venv\Scripts\activate
   python manage.py runserver localhost:8000
   ```

2. **Frontend Server** (in new terminal):
   ```cmd
   cd frontend
   npm run dev
   ```

## 🌐 Access URLs

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## 🔑 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| **Co Worker** | `coworker1` | `demo123` |
| **Doctor** | `doctor1` | `demo123` |
| **Administrator** | `admin` | `admin123` |

## 📱 Application Features

### Login System
- Role-based authentication (Co Worker/Doctor/Admin)
- JWT token-based security
- Offline fallback support

### Dashboard
- Patient statistics overview
- Quick action buttons
- Recent patients list
- Online/offline status

### Patient Registration
- Complete patient information form
- Address details with village/block/district
- Phone number and demographic data
- Form validation and error handling

### Vitals Entry
- Blood pressure (systolic/diastolic)
- Heart rate and temperature
- Weight and height measurements
- Symptoms and notes recording
- Patient selection dropdown

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `GET /api/auth/profile/` - User profile
- `POST /api/auth/refresh/` - Token refresh

### Patients
- `GET /api/patients/patients/` - List patients
- `POST /api/patients/patients/` - Create patient
- `GET /api/patients/vitals/` - List vitals records
- `POST /api/patients/vitals/` - Record vitals

### Consultations
- `GET /api/consultations/consultations/` - List consultations
- `POST /api/consultations/consultations/` - Create consultation

## 🛠️ Development

### Backend Development
```cmd
cd backend
venv\Scripts\activate
python manage.py runserver
```

### Frontend Development
```cmd
cd frontend
npm run dev
```

### Database Operations
```cmd
cd backend
venv\Scripts\activate
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Backend: Change port with `python manage.py runserver localhost:8001`
   - Frontend: Modify port in `package.json` scripts

2. **CORS Issues**
   - Ensure frontend URL is in `CORS_ALLOWED_ORIGINS` in `backend/healthbridge_saathi/settings.py`

3. **Database Issues**
   - Delete `backend/db.sqlite3` and run migrations again
   - Check if all migrations are applied: `python manage.py showmigrations`

4. **Node Modules Issues**
   ```cmd
   cd frontend
   rmdir /s node_modules
   npm install
   ```

5. **Python Virtual Environment Issues**
   ```cmd
   cd backend
   rmdir /s venv
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Error Messages

- **"Module not found"**: Ensure virtual environment is activated
- **"Port in use"**: Change port numbers in configuration
- **"CORS error"**: Check CORS settings in Django settings
- **"Database locked"**: Close all Django processes and restart

## 📊 System Requirements

### Minimum Requirements
- **OS**: Windows 10 or later
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Network**: Internet connection for initial setup

### Recommended Requirements
- **OS**: Windows 11
- **RAM**: 8GB or more
- **Storage**: 5GB free space
- **Network**: Stable internet connection

## 🚀 Production Deployment

### Backend (Django)
1. Set `DEBUG = False` in `settings.py`
2. Configure proper database (PostgreSQL recommended)
3. Set up proper `SECRET_KEY`
4. Configure static files serving
5. Use WSGI server like Gunicorn

### Frontend (React)
1. Run `npm run build`
2. Serve built files with nginx or Apache
3. Configure API endpoint for production
4. Set up HTTPS certificates

## 📞 Support

For issues and questions:
1. Check the troubleshooting section above
2. Verify all dependencies are installed correctly
3. Ensure both servers are running
4. Check browser console for JavaScript errors
5. Check Django logs for backend errors

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for rural healthcare delivery**