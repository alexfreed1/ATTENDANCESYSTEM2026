/**
 * Authentication Module
 * Handles user login, registration, and session management
 */

const AuthModule = {
    /**
     * Login user with email and password
     */
    async login(email, password) {
        try {
            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                throw new Error(error.message);
            }

            // Store user session
            this.saveSession(data.user, data.session);

            return {
                success: true,
                user: data.user,
                message: 'Login successful'
            };
        } catch (error) {
            console.error('[Auth] Login error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    /**
     * Register new user
     */
    async signup(email, password, fullName, departmentId) {
        try {
            const { data, error } = await window.supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        department_id: departmentId
                    }
                }
            });

            if (error) {
                throw new Error(error.message);
            }

            return {
                success: true,
                message: 'Signup successful. Please verify your email.',
                user: data.user
            };
        } catch (error) {
            console.error('[Auth] Signup error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    /**
     * Logout current user
     */
    async logout() {
        try {
            const { error } = await window.supabaseClient.auth.signOut();

            if (error) {
                throw new Error(error.message);
            }

            // Clear session
            this.clearSession();

            return {
                success: true,
                message: 'Logout successful'
            };
        } catch (error) {
            console.error('[Auth] Logout error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    /**
     * Get current session
     */
    async getCurrentUser() {
        try {
            const { data, error } = await window.supabaseClient.auth.getUser();

            if (error || !data.user) {
                return null;
            }

            return data.user;
        } catch (error) {
            console.error('[Auth] Get user error:', error);
            return null;
        }
    },

    /**
     * Save session to localStorage
     */
    saveSession(user, session) {
        localStorage.setItem(config.auth.tokenKey, session.access_token);
        localStorage.setItem(config.auth.userKey, JSON.stringify({
            id: user.id,
            email: user.email,
            user_metadata: user.user_metadata
        }));
    },

    /**
     * Get stored session
     */
    getSession() {
        const token = localStorage.getItem(config.auth.tokenKey);
        const user = localStorage.getItem(config.auth.userKey);

        if (!token || !user) {
            return null;
        }

        return {
            token,
            user: JSON.parse(user)
        };
    },

    /**
     * Clear session
     */
    clearSession() {
        localStorage.removeItem(config.auth.tokenKey);
        localStorage.removeItem(config.auth.userKey);
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.getSession() !== null;
    }
};

console.log('[AuthModule] Loaded');
