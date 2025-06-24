/**
 * Application configuration
 */
import { config as loadEnvVariables } from 'dotenv';
import type { CorsOptions } from 'cors';

// Load environment variables from .env file
loadEnvVariables();

/**
 * CORS configuration options
 *
 * When running with: `--api` flag (e.g. `npm run dev:api`), allows:
 * - Requests from FRONTEND_URL
 * - Direct API calls (undefined origin) for testing with curl/Postman
 *
 * Without `--api` flag, only allows requests from FRONTEND_URL
 */
const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const whiteList = [process.env.FRONTEND_URL];

    // Allows direct API calls like curl/Postman when running with the --api flag
    if (process.argv[2] === '--api') {
      whiteList.push(undefined);
    }

    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Configuration object with logical namespaces
const config = {
  env: process.env.NODE_ENV || 'development',

  // Server configuration
  server: {
    port: process.env.PORT || 8000,
  },

  // CORS configuration
  cors: corsConfig,

  // Database configuration
  db: {
    url: process.env.MONGODB_URL,
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '60d',
  },

  // Cloudinary configuration
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
} as const;

export default config;
