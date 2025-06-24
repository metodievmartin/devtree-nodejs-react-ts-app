import type { ProfileForm, User } from '../types';

import apiService from './api';
import { extractErrorMessage } from './apiUtils';

/**
 * Fetches the currently authenticated user
 * @throws Error if the user data cannot be fetched
 * @returns Promise with the user data
 */
export const getMyUserHttp = async (): Promise<User> => {
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

/**
 * Updates the user profile
 * @param userId User ID to update
 * @param profileData Profile data to update
 * @throws Error if the profile cannot be updated
 * @returns Promise with the updated user data
 */
export const updateUserProfileHttp = async (
  userId: string,
  profileData: ProfileForm
): Promise<User> => {
  try {
    return await apiService.api.updateUserProfile(userId, profileData);
  } catch (error) {
    // Extract the error message from the API response
    const errorMessage = extractErrorMessage(
      error,
      'Failed to update user profile'
    );
    // Re-throw for React Query to handle error state
    throw new Error(errorMessage);
  }
};
