/**
 * Utility Module
 * Helper functions for the application
 */

const Utils = {
    /**
     * Display notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    },

    /**
     * Show loading spinner
     */
    showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<div class="spinner"></div>';
        }
    },

    /**
     * Hide loading spinner
     */
    hideLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '';
        }
    },

    /**
     * Format date
     */
    formatDate(date) {
        return new Date(date).toLocaleDateString();
    },

    /**
     * Format datetime
     */
    formatDateTime(date) {
        return new Date(date).toLocaleString();
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return AuthModule.isLoggedIn();
    },

    /**
     * Redirect to login if not authenticated
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    },

    /**
     * Get current logged in user
     */
    getCurrentUser() {
        const session = AuthModule.getSession();
        return session ? session.user : null;
    },

    /**
     * Calculate attendance percentage
     */
    calculateAttendancePercentage(presentCount, totalCount) {
        if (totalCount === 0) return 0;
        return Math.round((presentCount / totalCount) * 100);
    },

    /**
     * Validate email
     */
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

console.log('[Utils] Loaded');
