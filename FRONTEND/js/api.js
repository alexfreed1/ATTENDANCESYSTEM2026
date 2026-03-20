/**
 * API Module
 * Handles all API calls to the backend
 */

const ApiModule = {
    /**
     * Make API request
     */
    async request(method, endpoint, data = null) {
        const url = `${config.api.baseUrl}${endpoint}`;
        const session = AuthModule.getSession();

        const headers = {
            'Content-Type': 'application/json'
        };

        if (session) {
            headers['Authorization'] = `Bearer ${session.token}`;
        }

        const options = {
            method,
            headers,
            timeout: config.api.timeout
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`[API] ${method} ${endpoint} error:`, error);
            throw error;
        }
    },

    // ========== ATTENDANCE ENDPOINTS ==========

    /**
     * Submit attendance for multiple students
     */
    async submitAttendance(trainerID, classId, unitId, week, lesson, records) {
        return this.request('POST', '/attendance/submit', {
            trainer_id: trainerID,
            class_id: classId,
            unit_id: unitId,
            week,
            lesson,
            records
        });
    },

    /**
     * Get attendance for a student
     */
    async getStudentAttendance(studentId, unitId = null, week = null) {
        let endpoint = `/attendance/student/${studentId}`;
        const params = new URLSearchParams();

        if (unitId) params.append('unit_id', unitId);
        if (week) params.append('week', week);

        if (params.toString()) {
            endpoint += '?' + params.toString();
        }

        return this.request('GET', endpoint);
    },

    /**
     * Get class attendance records
     */
    async getClassAttendance(classId, unitId, week, lesson) {
        return this.request('GET', `/attendance/class/${classId}?unit_id=${unitId}&week=${week}&lesson=${lesson}`);
    },

    /**
     * Update single attendance record
     */
    async updateAttendance(attendanceId, status) {
        return this.request('PUT', `/attendance/${attendanceId}`, { status });
    },

    // ========== CLASSES ENDPOINTS ==========

    /**
     * Get list of classes
     */
    async getClasses(departmentId = null) {
        let endpoint = '/classes';
        if (departmentId) {
            endpoint += `?department_id=${departmentId}`;
        }
        return this.request('GET', endpoint);
    },

    /**
     * Get class details
     */
    async getClass(classId) {
        return this.request('GET', `/classes/${classId}`);
    },

    /**
     * Get units for a class
     */
    async getClassUnits(classId) {
        return this.request('GET', `/classes/${classId}/units`);
    },

    // ========== STUDENTS ENDPOINTS ==========

    /**
     * Get students in a class
     */
    async getClassStudents(classId) {
        return this.request('GET', `/students/class/${classId}`);
    },

    /**
     * Get student details
     */
    async getStudent(studentId) {
        return this.request('GET', `/students/${studentId}`);
    },

    /**
     * Create new student
     */
    async createStudent(fullName, admissionNumber, email, classId) {
        return this.request('POST', '/students', {
            full_name: fullName,
            admission_number: admissionNumber,
            email,
            class_id: classId
        });
    },

    /**
     * Update student
     */
    async updateStudent(studentId, data) {
        return this.request('PUT', `/students/${studentId}`, data);
    },

    // ========== DEPARTMENTS ENDPOINTS ==========

    /**
     * Get list of departments
     */
    async getDepartments() {
        return this.request('GET', '/departments');
    },

    /**
     * Get department details
     */
    async getDepartment(departmentId) {
        return this.request('GET', `/departments/${departmentId}`);
    },

    /**
     * Get classes in department
     */
    async getDepartmentClasses(departmentId) {
        return this.request('GET', `/departments/${departmentId}/classes`);
    }
};

console.log('[ApiModule] Loaded');
