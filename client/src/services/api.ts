import axios, { AxiosError } from 'axios';
import type {
  AuthResponse,
  LoginCredentials,
  ProfileForm,
  RegisterData,
  User,
  UserApiResponse,
} from '../types';

// API path prefixes
const API_PREFIX = '/api/v1';
const AUTH_PREFIX = '/auth/v1';
const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

// Create the base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth specific functions with types for convenience
const authMethods = {
  login: async (credentials: LoginCredentials) => {
    const axiosResponse = await api.post<AuthResponse>(
      `${AUTH_PREFIX}/login`,
      credentials
    );

    const { data } = axiosResponse;

    if (!data.success || !data.accessToken) {
      // Custom error response for consistent error handling
      throw new AxiosError(
        'Login failed, please try again later.',
        '401',
        axiosResponse.config,
        axiosResponse.request,
        {
          ...axiosResponse,
          data: { error: 'Login failed, please try again later.' },
          status: 401,
          statusText: 'Unauthorized',
        }
      );
    }

    // Store the token in localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);

    return axiosResponse;
  },

  register: async (userData: RegisterData) => {
    return api.post<AuthResponse>(`${AUTH_PREFIX}/register`, userData);
  },

  logout: async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return api.post(`${AUTH_PREFIX}/logout`);
  },
};

// API methods with better typing
const apiMethods = {
  /**
   * Get the currently authenticated user
   * @returns Promise with the user data
   */
  getMyUser: async (): Promise<User> => {
    const axiosResponse = await api.get<UserApiResponse>(
      `${API_PREFIX}/users/me`
    );

    const { data } = axiosResponse;

    if (!data.success || !data.user) {
      // Custom error response for consistent error handling
      throw new AxiosError(
        'Failed to fetch user data',
        '401',
        axiosResponse.config,
        axiosResponse.request,
        {
          ...axiosResponse,
          data: { error: 'Failed to fetch user data' },
          status: 401,
          statusText: 'Unauthorized',
        }
      );
    }

    return data.user;
  },

  /**
   * Update the user profile
   * @param userId User ID to update
   * @param profileData Profile data to update
   * @returns Promise with the updated user data
   */
  updateUserProfile: async (
    userId: string,
    profileData: ProfileForm
  ): Promise<User> => {
    const axiosResponse = await api.patch<UserApiResponse>(
      `${API_PREFIX}/users/${userId}`,
      profileData
    );

    const { data } = axiosResponse;

    if (!data.success || !data.user) {
      // Custom error response for consistent error handling
      throw new AxiosError(
        'Failed to update user profile',
        '400',
        axiosResponse.config,
        axiosResponse.request,
        {
          ...axiosResponse,
          data: { error: 'Failed to update user profile' },
          status: 400,
          statusText: 'Bad Request',
        }
      );
    }

    return data.user;
  },

  /**
   * Upload a user's profile image
   * @param userId User ID to update
   * @param imageFile Image file to upload
   * @returns Promise with the image URL
   */
  uploadUserImage: async (userId: string, imageFile: File): Promise<string> => {
    const formData = new FormData();

    formData.append('image', imageFile);

    const axiosResponse = await api.post(
      `/api/v1/users/${userId}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const { data } = axiosResponse;

    if (!data.success || !data.imageUrl) {
      // Custom error response for consistent error handling
      throw new AxiosError(
        'Failed to upload user profile image',
        '500',
        axiosResponse.config,
        axiosResponse.request,
        {
          ...axiosResponse,
          data: { error: 'Failed to upload user profile image' },
          status: 500,
          statusText: 'Bad Request',
        }
      );
    }

    return data.imageUrl;
  },
};

// Combined service object
const apiService = {
  // Original axios instance
  instance: api,

  // API methods (/api/v1/...)
  api: apiMethods,

  // Auth methods (/auth/v1/...)
  auth: authMethods,
};

export default apiService;
