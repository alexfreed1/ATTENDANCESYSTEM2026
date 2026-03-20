-- Supabase Database Schema for Unit Attendance System
-- Run this in Supabase SQL Editor

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Classes Table
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(name, department_id)
);

-- Units Table
CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Trainers Table (links to Supabase Auth)
CREATE TABLE IF NOT EXISTS trainers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Class-Unit Assignment
CREATE TABLE IF NOT EXISTS class_units (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    unit_id INT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(class_id, unit_id, trainer_id)
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    admission_number VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255),
    class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Attendance Table (Main tracking)
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    unit_id INT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    week INT CHECK (week >= 1 AND week <= 52),
    lesson VARCHAR(10) CHECK (lesson IN ('L1', 'L2', 'L3', 'L4')),
    status VARCHAR(20) CHECK (status IN ('present', 'absent')) DEFAULT 'absent',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(student_id, unit_id, trainer_id, week, lesson)
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_students_class_id ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_classes_department_id ON classes(department_id);
CREATE INDEX IF NOT EXISTS idx_class_units_class_id ON class_units(class_id);
CREATE INDEX IF NOT EXISTS idx_class_units_trainer_id ON class_units(trainer_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_unit_id ON attendance(unit_id);
CREATE INDEX IF NOT EXISTS idx_attendance_trainer_id ON attendance(trainer_id);
CREATE INDEX IF NOT EXISTS idx_attendance_week_lesson ON attendance(week, lesson);

-- Sample Data (Optional - remove for production)
INSERT INTO departments (name) VALUES 
    ('Information Technology'),
    ('Business Management'),
    ('Engineering')
ON CONFLICT (name) DO NOTHING;

INSERT INTO units (code, title) VALUES 
    ('DBA-101', 'Database Administration'),
    ('WEB-201', 'Web Development'),
    ('SFT-301', 'Software Testing')
ON CONFLICT (code) DO NOTHING;
