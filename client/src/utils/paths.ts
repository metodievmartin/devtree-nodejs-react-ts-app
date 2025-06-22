/**
 * Application path constants and utility functions
 *
 * This module provides a centralised way to manage application routes
 * to avoid hardcoded strings and ensure consistency across the application.
 */

// Base paths
const BASE_PATHS = {
  AUTH: '/auth',
  ADMIN: '/admin',
} as const;

// Path builders
export const paths = {
  auth: {
    /**
     * Login page path
     * /auth/login
     * @returns {string} Path to the login page
     */
    login: (): string => `${BASE_PATHS.AUTH}/login`,

    /**
     * Registration page path
     * /auth/register
     * @returns {string} Path to the registration page
     */
    register: (): string => `${BASE_PATHS.AUTH}/register`,
  },

  admin: {
    /**
     * Admin dashboard path
     * /admin
     * @returns {string} Path to the admin dashboard
     */
    dashboard: (): string => BASE_PATHS.ADMIN,
  },

  // Helper to check if a path belongs to auth section
  isAuthPath: (path: string): boolean => path.startsWith(BASE_PATHS.AUTH),

  // Helper to check if a path belongs to admin section
  isAdminPath: (path: string): boolean => path.startsWith(BASE_PATHS.ADMIN),
};

export default paths;
