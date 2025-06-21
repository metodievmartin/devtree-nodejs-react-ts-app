import axios from 'axios';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types';

// API path prefixes
// const API_PREFIX = '/api/v1';
const AUTH_PREFIX = '/auth/v1';
const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

// Create the base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth specific functions with types for convenience
const authMethods = {
  login: async (credentials: LoginCredentials) => {
    return api.post<AuthResponse>(`${AUTH_PREFIX}/login`, credentials);
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
  // implement api methods
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
