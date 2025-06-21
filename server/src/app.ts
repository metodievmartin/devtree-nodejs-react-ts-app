import express from 'express';
import cors from 'cors';

import appConfig from './config/app.config';
import apiRouter from './routes/api.router';
import authRouter from './routes/auth.router';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors(appConfig.cors));
app.use(express.json());

// Routes
app.use('/api/v1', apiRouter);
app.use('/auth/v1', authRouter);

// Error handling middleware
app.use(errorHandler);

export default app;
