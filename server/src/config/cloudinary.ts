import { v2 as cloudinary } from 'cloudinary';

import config from '../config/app.config';

// Configure Cloudinary with credentials from app config
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export default cloudinary;
