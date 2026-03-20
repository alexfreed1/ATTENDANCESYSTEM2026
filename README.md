# Unit Attendance System - Complete Setup Guide

A modern unit attendance management system built with FastAPI (Backend), HTML/CSS/JavaScript (Frontend), and Supabase (Database).

## 📋 Project Structure

```
ATTENDANCE SYSTEM/
├── FRONTEND/                 # Netlify-ready frontend
│   ├── index.html           # Login page
│   ├── signup.html          # Registration page
│   ├── dashboard.html       # Main attendance marking page
│   ├── view-attendance.html # View attendance records
│   ├── css/
│   │   └── styles.css       # Tailwind-inspired styling
│   ├── js/
│   │   ├── config.js        # Configuration
│   │   ├── auth.js          # Authentication module
│   │   ├── api.js           # API calls
│   │   └── utils.js         # Utility functions
│   ├── assets/              # Images, logos
│   ├── netlify.toml         # Netlify configuration
│   └── package.json         # Frontend metadata
│
├── BACKEND/                 # Render-ready backend
│   ├── main.py             # FastAPI app entry point
│   ├── config.py           # Configuration
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   ├── routes/             # API endpoints
│   │   ├── auth.py         # Authentication endpoints
│   │   ├── attendance.py   # Attendance endpoints
│   │   ├── classes_routes.py
│   │   ├── students.py
│   │   └── departments.py
│   ├── Procfile            # Render deployment
│   └── render.yaml         # Render configuration
│
└── supabase_schema.sql     # Database schema
```

## 🚀 Quick Start

### Prerequisites
- Supabase account (https://supabase.com)
- Python 3.8+ (for local development)
- Git
- Netlify account (for frontend deployment)
- Render account (for backend deployment)

---

## 1️⃣ Setup Supabase Database

### Step 1: Create Supabase Project
1. Go to https://supabase.com and sign up
2. Create a new project
3. Note your project details:
   - **Project URL**: `https://your-project.supabase.co`
   - **Anon Key**: Available in Settings → API
   - **Service Role Key**: Available in Settings → API

### Step 2: Create Database Schema
1. Go to SQL Editor in your Supabase dashboard
2. Create a new query
3. Copy and paste the entire content of `supabase_schema.sql`
4. Execute the query

### Step 3: Enable Authentication
1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Email** provider
3. Go to **Settings** → **Email** and configure email templates (optional)

---

## 2️⃣ Setup Backend (FastAPI + Render)

### Step 1: Local Development Setup

```bash
# Navigate to backend directory
cd BACKEND

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit `BACKEND/.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DEBUG=True
PORT=8000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:3000
```

### Step 3: Run Locally

```bash
# Start FastAPI server
python main.py

# Or use uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

### Step 4: Deploy to Render

1. Push your code to GitHub
2. Go to render.com and create account
3. Click "New +" → Web Service
4. Connect your GitHub repository
5. Configure:
   - **Name**: `attendance-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (from Supabase):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DEBUG=False`
   - `FRONTEND_URL=<your-netlify-domain>`
7. Click "Create Web Service"

**Your backend URL**: `https://attendance-backend.onrender.com`

---

## 3️⃣ Setup Frontend (HTML/CSS/JS + Netlify)

### Step 1: Configure API Endpoint

Edit `FRONTEND/js/config.js`:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
const API_BASE_URL = 'https://attendance-backend.onrender.com/api';
```

### Step 2: Test Locally

```bash
# Navigate to frontend directory
cd FRONTEND

# Start local server (Python 3)
python -m http.server 3000

# Or use Node.js
npx http-server -p 3000

# Visit: http://localhost:3000
```

### Step 3: Deploy to Netlify

**Option A: Via GitHub (Recommended)**
1. Push code to GitHub
2. Go to netlify.com → Sign up
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure:
   - **Base directory**: `FRONTEND`
   - **Build command**: `echo 'Frontend is static'`
   - **Publish directory**: `FRONTEND`
6. Click "Deploy site"

**Option B: Drag & Drop**
1. Select all files in FRONTEND folder (excluding `.env`)
2. Drag and drop on netlify.com

**Your frontend URL**: `https://your-site.netlify.app`

---

## 📊 Database Schema Overview

### Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `departments` | Department management | id, name |
| `classes` | Classes in departments | id, name, department_id |
| `units` | Course units | id, code, title |
| `students` | Student records | id, full_name, admission_number, class_id |
| `trainers` | Trainer/staff | id (UUID), name, email, department_id |
| `class_units` | Unit assignments | id, class_id, unit_id, trainer_id |
| `attendance` | Attendance records | id, student_id, status (present/absent), week, lesson |

---

## 🔐 Authentication Flow

1. User signs up with email/password
2. Supabase creates auth account
3. Trainer profile created in database
4. User logs in → receives JWT token
5. Token stored in localStorage
6. All API requests include Authorization header

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/signup` - Register
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Attendance
- `POST /api/attendance/submit` - Submit attendance
- `GET /api/attendance/student/{id}` - Get student attendance
- `GET /api/attendance/class/{id}` - Get class attendance
- `PUT /api/attendance/{id}` - Update record
- `DELETE /api/attendance/{id}` - Delete record

### Classes
- `GET /api/classes` - List classes
- `GET /api/classes/{id}` - Get class
- `POST /api/classes` - Create class
- `PUT /api/classes/{id}` - Update class
- `GET /api/classes/{id}/units` - Get class units

### Students
- `GET /api/students/class/{class_id}` - List students in class
- `GET /api/students/{id}` - Get student
- `POST /api/students` - Create student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Departments
- `GET /api/departments` - List departments
- `GET /api/departments/{id}` - Get department
- `POST /api/departments` - Create department
- `GET /api/departments/{id}/classes` - Get department classes

---

## 🎨 UI Features

- **Clean, responsive design** - Works on desktop, tablet, mobile
- **Dark/Light theme ready** - CSS variables for customization
- **Attendance marking** - Simple ✓/✕ toggle buttons
- **Real-time feedback** - Success/error notifications
- **Export to CSV** - Download attendance records
- **Print support** - Print attendance sheets

---

## 🛠️ Troubleshooting

### Frontend Won't Connect to Backend
- Check API_BASE_URL in `config.js`
- Verify CORS settings in backend `main.py`
- Check browser console for errors (F12)

### Database Connection Error
- Verify Supabase URL and keys in `.env`
- Check database schema was created
- Confirm firewall allows Supabase connection

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check Supabase Auth settings
- Verify email/password requirements in signup

### Deployment Issues
- Check Render/Netlify build logs
- Verify environment variables set
- Ensure Python version 3.8+ for backend

---

## 📝 Usage Guide

### For Trainers

1. **Login** → Enter email/password
2. **Marking Attendance**:
   - Select Department → Class → Unit → Week → Lesson
   - Students appear in table
   - Click ✓ for present, ✕ for absent
   - Click "Submit Attendance"
3. **View Records**:
   - Click "View Attendance" to see previously marked records
   - Edit records as needed
   - Export to CSV or print

### For Administrators

1. **Setup** → Create departments, units, classes in database
2. **Assign** → Link units to classes and trainers
3. **Manage** → Add/remove students from classes

---

## 🔧 Customization

### Change Colors
Edit `FRONTEND/css/styles.css`:
```css
:root {
    --primary-color: #3b82f6;    /* Change this */
    --secondary-color: #10b981;   /* Change this */
    /* ... more colors ... */
}
```

### Add Your Logo
1. Place logo image in `FRONTEND/assets/`
2. Update HTML: `<img src="assets/your-logo.png">`

### Customize Attendance Statuses
Edit `FRONTEND/dashboard.html` and `FRONTEND/js/app.js` to change from present/absent to custom statuses.

---

## 📚 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Python, FastAPI, Uvicorn |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | Supabase Auth (Email/Password) |
| **Deployment** | Netlify (Frontend), Render (Backend) |

---

## 📄 License

MIT License - Feel free to use for educational and commercial purposes.

---

## 🤝 Support

For issues or questions:
1. Check error messages in browser console
2. Review backend logs on Render
3. Verify database schema and data
4. Check API endpoint responses in Postman/Insomnia

---

## Next Steps

1. ✅ Setup Supabase and create database
2. ✅ Configure and deploy backend to Render
3. ✅ Update frontend config with Supabase keys and API URL
4. ✅ Deploy frontend to Netlify
5. ✅ Create initial data (departments, units, classes, students)
6. ✅ Test full workflow end-to-end
7. ✅ Share with trainers/users

---

**Happy tracking!** 📊✅
#   A T T E N D A N C E S Y S T E M 2 0 2 6  
 