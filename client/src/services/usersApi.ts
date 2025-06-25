import type { User, UserUpdateData } from '../types';

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
  profileData: UserUpdateData
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

/**
 * Uploads a user profile image
 * @param userId User ID to update
 * @param imageFile Image file to upload
 * @throws Error if the image cannot be uploaded
 * @returns Promise with the image URL
 */
export const uploadUserImageHttp = async (
  userId: string,
  imageFile: File
): Promise<string> => {
  try {
    return await apiService.api.uploadUserImage(userId, imageFile);
  } catch (error) {
    console.error('Error uploading image:', error);
    // Extract the error message from the API response
    const errorMessage = extractErrorMessage(
      error,
      'Failed to upload profile image'
    );
    // Re-throw for React Query to handle error state
    throw new Error(errorMessage);
  }
};
