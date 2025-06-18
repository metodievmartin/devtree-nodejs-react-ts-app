/**
 * Application configuration
 */
import { config as loadEnvVariables } from 'dotenv';

// Load environment variables from .env file
loadEnvVariables();

// Configuration object with logical namespaces
const config = {
  env: process.env.NODE_ENV || 'development',

  // Server configuration
  server: {
    port: process.env.PORT || 8000,
  },

  // Database configuration
  db: {
    url: process.env.MONGODB_URL,
  },
};

export default config;
