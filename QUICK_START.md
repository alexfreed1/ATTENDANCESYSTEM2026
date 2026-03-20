# 📋 Unit Attendance System - Quick Reference

## 🎯 Project Overview

Modern attendance management system using:
- **Frontend**: HTML, CSS, JavaScript (Netlify)
- **Backend**: Python FastAPI (Render)
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth

## 📁 Project Structure

```
ATTENDANCE SYSTEM/
├── FRONTEND/              ← Deploy to Netlify
│   ├── index.html        (Login)
│   ├── signup.html       (Register)
│   ├── dashboard.html    (Main - Mark Attendance)
│   ├── view-attendance.html (View Records)
│   ├── css/styles.css
│   ├── js/
│   │   ├── config.js     (Setup)
│   │   ├── auth.js       (Authentication)
│   │   ├── api.js        (API Client)
│   │   └── utils.js      (Helpers)
│   └── netlify.toml      (Config)
│
├── BACKEND/               ← Deploy to Render
│   ├── main.py           (FastAPI App)
│   ├── config.py         (Configuration)
│   ├── routes/           (API Endpoints)
│   │   ├── auth.py
│   │   ├── attendance.py
│   │   ├── classes_routes.py
│   │   ├── students.py
│   │   └── departments.py
│   ├── requirements.txt   (Dependencies)
│   ├── .env.example      (Template)
│   ├── Procfile          (Config)
│   └── render.yaml       (Config)
│
├── supabase_schema.sql   (Database Setup)
├── README.md             (This document)
└── .gitignore
```

## ⚡ 5-Step Setup Guide

### Step 1: Supabase Database Setup (10 min)
1. Sign up at supabase.com
2. Create new project
3. Copy: Project URL, Anon Key, Service Role Key
4. Go to SQL Editor
5. Paste & execute `supabase_schema.sql`

### Step 2: Backend Setup (15 min)
```bash
cd BACKEND
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with Supabase keys
python main.py
# Visit: http://localhost:8000/docs
```

### Step 3: Frontend Configuration (5 min)
Edit `FRONTEND/js/config.js`:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const API_BASE_URL = 'http://localhost:8000/api';
```

### Step 4: Test Locally (10 min)
```bash
cd FRONTEND
python -m http.server 3000
# Visit: http://localhost:3000
# Test: Create account → Login → Mark attendance
```

### Step 5: Deploy (20 min each)

**Backend + Frontend to Render (Recommended - uses render.yaml):**
1. Push code to GitHub
2. Connect repo at render.com/dashboard
3. Auto-detects 2 services: attendance-backend (Python API), attendance-frontend (Static site)
4. Set env vars (Dashboard → Environment): SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, PYTHON_VERSION=3.11, DEBUG=false
5. Deploy both → Backend: https://attendance-backend.onrender.com | Frontend: https://attendance-frontend.onrender.dev

**Alternative: Frontend to Netlify:**
1. Update `FRONTEND/js/config.js` API_BASE_URL with Render backend URL
2. Connect GitHub repo or drag FRONTEND/ to netlify.com
3. Auto-uses netlify.toml (publish=.)
4. Frontend URL: e.g., https://attendance-app.netlify.app

## 🔑 Important URLs

Keep these handy:

```
Supabase Project URL:    https://your-project.supabase.co
Supabase Dashboard:      https://app.supabase.com
Backend (Render):        https://attendance-backend.onrender.com
Frontend (Netlify):      https://attendance-app.netlify.app
API Docs:                GET /docs (on backend)
```

## 📊 Database Tables

| Table | Purpose |
|-------|---------|
| `departments` | IT, Business, Engineering |
| `classes` | Class A, B, C... |
| `units` | DBA-101, WEB-201... |
| `students` | Student records |
| `trainers` | Trainer accounts |
| `class_units` | Unit to Class mapping |
| `attendance` | Attendance records (present/absent) |

## 🔐 Authentication

- **Signup**: Email + Password → Creates Supabase user
- **Login**: Email + Password → Gets JWT token
- **Session**: Token stored in localStorage
- **API**: All requests need `Authorization: Bearer {token}`

## 📱 Frontend Pages

| Page | URL | Purpose |
|------|-----|---------|
| Login | `index.html` | Sign in |
| Signup | `signup.html` | Create account |
| Dashboard | `dashboard.html` | Mark attendance |
| View | `view-attendance.html` | View records |

## 🔧 API Endpoints

### Attendance
```
POST   /api/attendance/submit           ← Mark attendance
GET    /api/attendance/class/{id}       ← View records
PUT    /api/attendance/{id}             ← Edit record
DELETE /api/attendance/{id}             ← Delete record
```

### Students
```
GET    /api/students/class/{class_id}   ← Get students
POST   /api/students                    ← Add student
PUT    /api/students/{id}               ← Update student
DELETE /api/students/{id}               ← Delete student
```

### Classes
```
GET    /api/classes                     ← List classes
POST   /api/classes                     ← Create class
GET    /api/classes/{id}/units          ← Get units
```

### Departments
```
GET    /api/departments                 ← List departments
GET    /api/departments/{id}/classes    ← Get classes
```

### Authentication
```
POST   /api/auth/login                  ← Sign in
POST   /api/auth/signup                 ← Sign up
POST   /api/auth/logout                 ← Sign out
GET    /api/auth/me                     ← Current user
```

## 🎨 Customization

**Change Colors:**
Edit `FRONTEND/css/styles.css` → `:root` section

**Change Logo:**
Replace image in `FRONTEND/assets/`

**Add School Name:**
Edit `FRONTEND/dashboard.html` → header section

**Change Department/Unit/Lesson:**
Edit `supabase_schema.sql` sample data, then re-export schema

## 🧪 Testing Checklist

- [ ] Signup works
- [ ] Login works
- [ ] Select filters loads data
- [ ] Mark attendance (✓/✕)
- [ ] Submit saves to database
- [ ] View attendance shows records
- [ ] Mobile layout works
- [ ] Export CSV works
- [ ] Print works
- [ ] Logout works

## 🆘 Quick Troubleshooting

**Can't login?**
→ Check email exists in Supabase Auth → Check password is correct

**API 404 errors?**
→ Verify API_BASE_URL in config.js → Verify backend is running

**Database connection error?**
→ Check Supabase URL and keys in .env → Check firewall

**Blank page?**
→ Open DevTools (F12) → Check console for errors

**Styles not loading?**
→ Hard refresh (Ctrl+F5) → Check CSS file path

## 📚 Documentation Files

- `README.md` - Full setup guide
- `BACKEND/README.md` - API documentation
- `FRONTEND/README.md` - Frontend guide
- `supabase_schema.sql` - Database schema

## 🚀 Next Steps After Deployment

1. Add initial data:
   - Departments → Classes → Units → Students
   
2. Configure trainers:
   - Create trainer accounts via signup
   - Assign units to classes/trainers
   
3. Start marking attendance:
   - Trainers login
   - Select class/unit/week/lesson
   - Mark attendance ✓ or ✕
   - Submit and view records

4. Monitor usage:
   - Check Render logs for errors
   - Monitor Supabase database
   - Review attendance reports

## 💡 Pro Tips

- **Bulk Upload Students**: Parse CSV → Use API endpoint
- **Export Reports**: Download CSV from view page
- **Mobile First**: All pages responsive
- **Offline Support**: Can be added with Service Workers
- **Multi-language**: Can localize UI text

## 📞 Support Resources

- Supabase Docs: https://supabase.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com
- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com

## ✅ Readyto Deploy?

```bash
# Checklist before deployment:

1. ✅ Supabase project created and schema imported
2. ✅ Backend tested locally and working
3. ✅ Frontend config.js updated with URLs
4. ✅ Code pushed to GitHub
5. ✅ Backend deployed to Render
6. ✅ Frontend deployed to Netlify
7. ✅ All URLs updated in config.js
8. ✅ Full testing completed
9. ✅ Ready for production!
```

---

**Built with ❤️ - Enjoy your attendance system!** 🎉
