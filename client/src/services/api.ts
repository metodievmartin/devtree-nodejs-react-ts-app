import axios, { AxiosError } from 'axios';
import type {
  AuthResponse,
  LoginCredentials,
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
