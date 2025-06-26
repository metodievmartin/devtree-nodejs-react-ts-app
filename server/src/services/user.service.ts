import { Request } from 'express';
import formidable from 'formidable';
import { v4 as uuid } from 'uuid';

import {
  findUserById,
  findUserByHandle,
  createHandle,
} from '../models/user.model';
import cloudinary from '../config/cloudinary';
import { ApiError } from '../utils/api-error';
import { SafeUser, UserUpdateData, PublicUser } from '../types/user.types';
import { KILOBYTE } from '../constants';

/**
 * Get a user by their handle
 * @param handle User's handle
 * @returns Public user document or throws an error if not found
 */
export const getUserByHandle = async (handle: string): Promise<PublicUser> => {
  // Validate handle
  if (!handle) {
    throw new ApiError(400, 'Handle is required');
  }

  // Find the user by handle
  const user = await findUserByHandle(handle);

  if (!user) {
    throw new ApiError(404, 'Could not find user with that handle');
  }

  // Return only public user information
  const publicUser: PublicUser = {
    handle: user.handle,
    name: user.name,
    description: user.description,
    image: user.image,
    links: user.links,
  };

  return publicUser;
};

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
  targetUser.links = updateData.links || '[]';

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

/**
 * Upload a user's profile image to Cloudinary
 * @param req Express request object containing the file
 * @param userId User ID to update
 * @returns Object containing the secure URL of the uploaded image
 */
export const uploadUserImage = async (req: Request, userId: string) => {
  // Validate user ID
  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }

  // Find the user by ID
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Parse the request containing form data
  const FIVE_HUNDRED_KB = 500 * KILOBYTE;
  const form = formidable({ multiples: false, maxFileSize: FIVE_HUNDRED_KB });

  const [_, files] = await form.parse(req);

  if (!files || !files.image || !files.image[0]) {
    throw new ApiError(400, 'No image file provided');
  }

  const imageFile = files.image[0];

  // Check if the file is a valid image file
  if (!imageFile.mimetype.startsWith('image/')) {
    throw new ApiError(400, 'Invalid image file');
  } else if (imageFile.mimetype.startsWith('image/svg')) {
    throw new ApiError(400, 'SVG images are not allowed');
  }

  const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
    public_id: uuid(),
  });

  if (!uploadResult || uploadResult.error || !uploadResult.secure_url) {
    throw new ApiError(500, 'There was an error uploading the image');
  }

  user.image = uploadResult.secure_url;
  await user.save();

  return {
    imageUrl: user.image,
  };
};
