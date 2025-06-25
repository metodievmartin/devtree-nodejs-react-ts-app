import { toast } from 'sonner';
import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ProfileForm, User, UserUpdateData } from '../types';

import {
  updateUserProfileHttp,
  uploadUserImageHttp,
} from '../services/usersApi';
import ErrorMessage from '../components/ErrorMessage.tsx';

const ProfileView = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<User>(['my-user'])!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: currentUser.name,
      handle: currentUser.handle,
      description: currentUser.description,
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });

  const { mutate: updateUserProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: (updateData: UserUpdateData) =>
        updateUserProfileHttp(currentUser._id, updateData),
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Profile updated successfully');
        queryClient.invalidateQueries({ queryKey: ['my-user'] });
      },
    });

  const { mutate: uploadUserImage, isPending: isUploadingImage } = useMutation({
    mutationFn: (imageFile: File) =>
      uploadUserImageHttp(currentUser._id, imageFile),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (imageUrl: string) => {
      toast.success('Image uploaded successfully');
      // Optimistic UI - can update the cache since we're pretty sure this was successful
      queryClient.setQueryData(['my-user'], (prevData: User) => {
        return {
          ...prevData,
          image: imageUrl,
        };
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadUserImage(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    const userData = queryClient.getQueryData<User>(['my-user'])!;
    updateUserProfile({
      name: formData.name,
      handle: formData.handle,
      description: formData.description,
      image: userData.image,
      links: userData.links,
    });
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">Edit info</legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your name"
          {...register('name', {
            required: 'Name is a required field',
          })}
        />

        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle*</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your handle or username"
          {...register('handle', {
            required: 'Handle is a required field',
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message:
                'Handle can only contain letters, numbers, underscores and hyphens',
            },
          })}
        />

        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your description..."
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          name="image"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
          disabled={isUploadingImage}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value={isUpdatingProfile ? 'Saving...' : 'Save changes'}
        disabled={isUpdatingProfile}
      />
    </form>
  );
};

export default ProfileView;
