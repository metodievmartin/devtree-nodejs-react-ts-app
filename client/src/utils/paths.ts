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
  INDEX: '/',
} as const;

/**
 * Creates a path builder function
 * @param basePath - The base path for all routes
 * @param segment - The path segment to append
 * @returns A function that returns the full or relative path based on options
 */
const createStaticPathFactory = (
  basePath: string = '',
  segment: string = ''
) => {
  return (options: PathOptions = {}): string => {
    const { relative = false } = options;

    if (segment === '/') {
      return basePath; // Base path with no segment
    }

    return relative ? segment : `${basePath}/${segment}`;
  };
};

/**
 * Creates a dynamic path builder function
 * @param basePath - Optional prefix for the path (e.g., '/api')
 * @returns A function that accepts a dynamic segment and options and returns the path
 */
const createDynamicPathFactory = (basePath: string = '/') => {
  return (segment: string, options: PathOptions = {}): string => {
    if (!segment) {
      throw new Error('Dynamic segment is required for path');
    }

    const { relative = false } = options;

    if (basePath === '/') {
      return relative ? segment : `/${segment}`;
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
    login: createStaticPathFactory(BASE_PATHS.AUTH, 'login'),

    /**
     * Registration page path
     * `/auth/register`
     * @param {PathOptions} options - Path options
     * @returns Path to the registration page
     */
    register: createStaticPathFactory(BASE_PATHS.AUTH, 'register'),
  },

  admin: {
    /**
     * Admin dashboard path
     * `/admin`
     * @param {PathOptions} options - Path options
     * @returns Path to the admin dashboard
     */
    index: createStaticPathFactory(BASE_PATHS.ADMIN),

    /**
     * Admin profile page path
     * `/admin/profile`
     * @param {PathOptions} options - Path options
     * @returns Path to the admin profile page
     */
    profile: createStaticPathFactory(BASE_PATHS.ADMIN, 'profile'),
  },

  /**
   * User profile page path with dynamic handle
   * `/:handle`
   * @param {string} handle - User handle/username
   * @param {PathOptions} options - Path options
   * @returns Path to the user's profile page
   */
  userProfile: createDynamicPathFactory(),

  // Helper to check if a path belongs to auth section
  isAuthPath: (path: string): boolean => path.startsWith(BASE_PATHS.AUTH),

  // Helper to check if a path belongs to admin section
  isAdminPath: (path: string): boolean => path.startsWith(BASE_PATHS.ADMIN),
};

export default paths;
