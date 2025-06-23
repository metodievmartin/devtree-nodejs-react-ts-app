import type { User } from '../types';

import apiService from './api';
import { extractErrorMessage } from './apiUtils';

/**
 * Fetches the currently authenticated user
 * @throws Error if the user data cannot be fetched
 * @returns Promise with the user data
 */
export const getMyUser = async (): Promise<User> => {
  try {
    return await apiService.api.getMyUser();
  } catch (error) {
    // Extract the error message from the API response
    const errorMessage = extractErrorMessage(
      error,
      'Failed to fetch user profile'
    );
    // Re-throw for React Query to handle error state
    throw new Error(errorMessage);
  }
};
