/**
 * User-related type definitions
 */

/**
 * User registration data
 * Contains all fields needed to create a new user
 */
export interface UserRegistrationData {
  email: string;
  password: string;
  handle: string;
  name: string;
  description?: string;
  image?: string;
  links?: string;
}
