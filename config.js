/**
 * Supabase Configuration and Client
 */

const SUPABASE_URL = 'https://bhhztwftgftrvmumxcqz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaHp0d2Z0Z2Z0cnZtdW14Y3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTk3MTUsImV4cCI6MjA4OTU3NTcxNX0.pwKofoofGnGwyQmflsb9TFO9Z4WbEr0iFNgZhX2_Crw';
const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your backend URL

// Initialize Supabase
const { createClient } = window.supabase;
window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Configuration object for the application
 */
const config = {
    api: {
        baseUrl: API_BASE_URL || 'http://localhost:8000/api',
        timeout: 10000
    },
    app: {
        name: 'Unit Attendance System',
        version: '1.0.0'
    },
    auth: {
        tokenKey: 'attendance_token',
        userKey: 'attendance_user'
    }
};

// Log configuration
console.log('[Config] Application initialized:', config);
