# Frontend Documentation

HTML/CSS/JavaScript frontend for Unit Attendance System.

## 📁 File Structure

```
FRONTEND/
├── index.html              # Login page
├── signup.html             # Registration page
├── dashboard.html          # Main attendance marking interface
├── view-attendance.html    # View attendance records
├── css/
│   └── styles.css          # All CSS styling
├── js/
│   ├── config.js           # Configuration and Supabase setup
│   ├── auth.js             # Authentication module
│   ├── api.js              # API client module
│   └── utils.js            # Utility functions
├── assets/                 # Images, logos
├── netlify.toml            # Netlify deployment config
└── package.json            # Project metadata
```

## 🚀 Quick Start

### Local Development

```bash
cd FRONTEND

# Option 1: Python 3
python -m http.server 3000

# Option 2: Node.js/npm
npx http-server -p 3000

# Option 3: Live Server (VS Code)
# Install extension and click "Go Live"

# Visit: http://localhost:3000
```

### Production

Update `js/config.js` with your production URLs:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
const API_BASE_URL = 'https://your-backend.onrender.com/api';
```

Deploy to Netlify:
```bash
# Option A: Connect GitHub repo to Netlify
# Option B: Drag & drop FRONTEND folder
# Option C: Use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

---

## 📄 Pages Overview

### 1. Login (index.html)
User authentication page.

**Features:**
- Email/password input
- Form validation
- Error messaging
- "Sign up" link for new users

**JavaScript:** `auth.js` - `AuthModule.login()`

---

### 2. Sign Up (signup.html)
User registration page.

**Features:**
- Full name, email, password input
- Department selection
- Password confirmation
- Email validation
- Existing account link

**JavaScript:** `auth.js` - `AuthModule.signup()`

---

### 3. Dashboard (dashboard.html)
Main attendance marking interface.

**Features:**
- Department selection
- Dynamic class loading
- Unit/Week/Lesson filters
- Student list table
- Attendance toggle (✓/✕ buttons)
- Submit and view buttons

**JavaScript:**
```javascript
toggleAttendance(studentId, status)  // Mark present/absent
submitAttendance()                   // Save to backend
viewAttendance()                     // Navigate to view page
```

---

### 4. View Attendance (view-attendance.html)
View and manage recorded attendance.

**Features:**
- Display attendance records
- Statistics (present, absent, attendance rate)
- Edit individual records
- Export to CSV
- Print functionality

**JavaScript:**
```javascript
loadAttendance()        // Fetch records
renderRecords()         // Display in table
calculateStatistics()   // Compute metrics
exportToCSV()          // Download CSV
editRecord(id)         // Update record
```

---

## 🔧 JavaScript Modules

### config.js
Application configuration and Supabase client initialization.

```javascript
SUPABASE_URL              // Your Supabase project URL
SUPABASE_ANON_KEY         // Supabase public key
API_BASE_URL              // Backend API base URL
config.api.timeout        // Request timeout
config.auth.tokenKey      // LocalStorage key for token
config.auth.userKey       // LocalStorage key for user
```

---

### auth.js
Supabase authentication wrapper.

**Methods:**
```javascript
AuthModule.login(email, password)
AuthModule.signup(email, password, fullName, departmentId)
AuthModule.logout()
AuthModule.getCurrentUser()
AuthModule.saveSession(user, session)
AuthModule.getSession()
AuthModule.clearSession()
AuthModule.isLoggedIn()
```

**Example:**
```javascript
const result = await AuthModule.login('user@example.com', 'password');
if (result.success) {
    console.log('Logged in as:', result.user);
} else {
    console.error('Login failed:', result.message);
}
```

---

### api.js
HTTP client for backend API calls.

**Methods:**
```javascript
// Attendance
ApiModule.submitAttendance(trainerId, classId, unitId, week, lesson, records)
ApiModule.getStudentAttendance(studentId, unitId, week)
ApiModule.getClassAttendance(classId, unitId, week, lesson)
ApiModule.updateAttendance(attendanceId, status)

// Classes
ApiModule.getClasses(departmentId)
ApiModule.getClass(classId)
ApiModule.getClassUnits(classId)

// Students
ApiModule.getClassStudents(classId)
ApiModule.getStudent(studentId)
ApiModule.createStudent(fullName, admissionNumber, email, classId)
ApiModule.updateStudent(studentId, data)

// Departments
ApiModule.getDepartments()
ApiModule.getDepartment(departmentId)
ApiModule.getDepartmentClasses(departmentId)
```

**Example:**
```javascript
try {
    const response = await ApiModule.getDepartments();
    console.log('Departments:', response.departments);
} catch (error) {
    console.error('Error:', error.message);
}
```

---

### utils.js
Helper functions and utilities.

**Methods:**
```javascript
Utils.showNotification(message, type)      // Toast notification
Utils.showLoading(elementId)               // Show spinner
Utils.hideLoading(elementId)               // Hide spinner
Utils.formatDate(date)                     // Format date
Utils.formatDateTime(date)                 // Format datetime
Utils.isAuthenticated()                    // Check login status
Utils.requireAuth()                        // Redirect if not logged in
Utils.getCurrentUser()                     // Get logged in user
Utils.calculateAttendancePercentage(present, total)
Utils.validateEmail(email)                 // Email validation
Utils.debounce(func, wait)                 // Debounce function
```

**Example:**
```javascript
if (!Utils.requireAuth()) return;  // Redirect to login if needed

Utils.showNotification('Attendance saved!', 'success');

const percentage = Utils.calculateAttendancePercentage(20, 25);
console.log(percentage); // 80
```

---

## 🎨 CSS Styling

### Color Palette

```css
:root {
    --primary-color: #3b82f6;      /* Blue */
    --primary-dark: #1e40af;       /* Dark Blue */
    --secondary-color: #10b981;    /* Green */
    --danger-color: #ef4444;       /* Red */
    --warning-color: #f59e0b;      /* Amber */
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --text-primary: #111827;
    --text-secondary: #6b7280;
}
```

### Key Classes

```css
/* Containers */
.container           /* Max-width wrapper */
.card               /* White card with shadow */
.grid, .grid-2,     /* Grid layouts */
.grid-3, .grid-4

/* Forms */
.form-group         /* Form field wrapper */
.form-group input   /* Input styling */
.form-group select  /* Select styling */

/* Buttons */
.btn                /* Base button */
.btn-primary        /* Primary blue button */
.btn-success        /* Success green button */
.btn-danger         /* Danger red button */
.btn-secondary      /* Gray button */
.btn-sm, .btn-lg    /* Button sizes */

/* Tables */
.table              /* Table styling */
.table-striped      /* Alternating rows */

/* Alerts */
.alert              /* Alert base */
.alert-success      /* Green alert */
.alert-danger       /* Red alert */
.alert-warning      /* Amber alert */
.notification       /* Toast notification */

/* Utilities */
.text-center        /* Center align */
.text-muted         /* Gray text */
.text-bold          /* Bold text */
.hidden             /* Display: none */
.mt-1, .mb-2, etc   /* Margin utilities */
.p-2, .p-4          /* Padding utilities */
```

### Responsive Design

```css
/* Mobile first approach */
/* Mobile < 768px */
/* Tablet 768px - 1024px */
/* Desktop > 1024px */

/* Media queries */
@media (max-width: 768px) {
    /* Mobile optimizations */
}
```

---

## 🔐 Authentication Flow

```
User Input
    ↓
AuthModule.login(email, password)
    ↓
Supabase Auth API
    ↓
Save: token + user → localStorage
    ↓
Redirect to dashboard.html
    ↓
All API calls include Authorization header
```

---

## 📡 API Integration Example

```javascript
// 1. Get departments
const depts = await ApiModule.getDepartments();

// 2. User selects department
const deptId = 1;

// 3. Get classes in department
const classes = await ApiModule.getDepartmentClasses(deptId);

// 4. User selects class
const classId = 5;

// 5. Get students in class
const students = await ApiModule.getClassStudents(classId);

// 6. User marks attendance
for (let student of students) {
    if (student_present) {
        attendanceData[student.id] = 'present';
    }
}

// 7. Submit attendance
await ApiModule.submitAttendance(
    trainerId,
    classId,
    unitId,
    week,
    lesson,
    records
);
```

---

## 🛠️ Customization

### Change Logo
```html
<!-- In any HTML file -->
<img src="assets/your-logo.png" alt="Logo" style="height: 60px;">
```

### Change Colors
Edit `css/styles.css`:
```css
:root {
    --primary-color: #yourcolor;    /* Change primary */
    --secondary-color: #yourcolor;  /* Change secondary */
}
```

### Add New Page
1. Create new HTML file (e.g., `reports.html`)
2. Include required scripts:
   ```html
   <script src="js/config.js"></script>
   <script src="js/auth.js"></script>
   <script src="js/api.js"></script>
   <script src="js/utils.js"></script>
   ```
3. Add your HTML and JavaScript

### Change API Timeout
In `config.js`:
```javascript
const config = {
    api: {
        timeout: 15000  // 15 seconds
    }
};
```

---

## 🧪 Testing Checklist

- [ ] Login with valid credentials
- [ ] Signup creates new account
- [ ] Logout clears session
- [ ] Select filters loads data
- [ ] Mark attendance updates state
- [ ] Submit saves to backend
- [ ] View attendance shows records
- [ ] Export to CSV works
- [ ] Print view displays correctly
- [ ] Mobile layout responsive
- [ ] Error messages display
- [ ] Loading spinners show

---

## 🚀 Deployment Checklist

- [ ] Update Supabase keys in `js/config.js`
- [ ] Update API_BASE_URL in `js/config.js`
- [ ] Test all features locally
- [ ] Remove debugging code
- [ ] Optimize images in assets
- [ ] Clear browser cache
- [ ] Deploy to Netlify
- [ ] Test in production
- [ ] Setup custom domain (optional)

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🆘 Common Issues

**Blank page on load?**
- Check browser console (F12)
- Verify Supabase keys
- Check API_BASE_URL is correct

**Can't login?**
- Check email exists in Supabase Auth
- Verify password is correct
- Check email hasn't been verified

**API calls fail?**
- Verify backend is running
- Check CORS settings in backend
- Verify API_BASE_URL in config.js
- Check network tab in DevTools

**Styles not loading?**
- Verify css/styles.css path
- Check file permissions
- Clear browser cache

---

**Built with ❤️ using Vanilla JavaScript**
