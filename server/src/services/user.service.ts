import {
  findUserById,
  findUserByHandle,
  createHandle,
} from '../models/user.model';
import { ApiError } from '../utils/api-error';
import { SafeUser, UserUpdateData } from '../types/user.types';

/**
 * Update a user's profile
 * @param userId ID of the user to update
 * @param updateData Object containing fields to update (handle, description)
 * @returns Updated user document
 */
export const updateUserProfile = async (
  userId: string,
  updateData: UserUpdateData
): Promise<SafeUser> => {
  // Validate userId
  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }

  // Validate required fields
  if (!updateData || !updateData.name || !updateData.handle) {
    throw new ApiError(
      400,
      "Invalid update data: 'name' and 'handle' are required"
    );
  }

  // Find the user by ID
  const targetUser = await findUserById(userId);

  if (!targetUser) {
    throw new ApiError(404, 'User not found');
  }

  // Update the name
  targetUser.name = updateData.name;

  // Normalize the handle
  const normalizedHandle = createHandle(updateData.handle);

  // If the handle is different from the current one, check if it's already taken
  if (normalizedHandle !== targetUser.handle) {
    const existingHandle = await findUserByHandle(normalizedHandle);

    if (existingHandle) {
      throw new ApiError(409, 'Handle is already taken');
    }

    // Update the handle
    targetUser.handle = normalizedHandle;
  }

  // Update the description
  targetUser.description = updateData.description || '';

  // Save the updated user
  await targetUser.save();

  const safeUser: SafeUser = {
    _id: targetUser._id,
    handle: targetUser.handle,
    name: targetUser.name,
    email: targetUser.email,
    description: targetUser.description,
    image: targetUser.image,
    links: targetUser.links,
  };

  return safeUser;
};
