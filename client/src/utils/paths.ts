/**
 * Application path constants and utility functions
 *
 * This module provides a centralised way to manage application routes
 * to avoid hardcoded strings and ensure consistency across the application.
 */

// Path options type
export type PathOptions = {
  /**
   * When true, returns only the relative path segment without the parent path
   * Useful for nested routes in React Router
   */
  relative?: boolean;
};

// Base paths
const BASE_PATHS = {
  AUTH: '/auth',
  ADMIN: '/admin',
} as const;

/**
 * Creates a path builder function
 * @param basePath - The base path for all routes
 * @param segment - The path segment to append
 * @returns A function that returns the full or relative path based on options
 */
const createPathBuilder = (basePath: string, segment: string = '') => {
  return (options: PathOptions = {}): string => {
    const { relative = false } = options;

    if (segment === '') {
      return basePath; // Base path with no segment
    }

    return relative ? segment : `${basePath}/${segment}`;
  };
};

// Path builders
export const paths = {
  auth: {
    /**
     * Login page path
     * `/auth/login`
     * @param {PathOptions} options - Path options
     * @returns Path to the login page
     */
    login: createPathBuilder(BASE_PATHS.AUTH, 'login'),

    /**
     * Registration page path
     * `/auth/register`
     * @param {PathOptions} options - Path options
     * @returns Path to the registration page
     */
    register: createPathBuilder(BASE_PATHS.AUTH, 'register'),
  },

  admin: {
    /**
     * Admin dashboard path
     * `/admin`
     * @param {PathOptions} options - Path options
     * @returns Path to the admin dashboard
     */
    index: createPathBuilder(BASE_PATHS.ADMIN),

    /**
     * Admin profile page path
     * `/admin/profile`
     * @param {PathOptions} options - Path options
     * @returns Path to the admin profile page
     */
    profile: createPathBuilder(BASE_PATHS.ADMIN, 'profile'),
  },

  // Helper to check if a path belongs to auth section
  isAuthPath: (path: string): boolean => path.startsWith(BASE_PATHS.AUTH),

  // Helper to check if a path belongs to admin section
  isAdminPath: (path: string): boolean => path.startsWith(BASE_PATHS.ADMIN),
};

export default paths;
