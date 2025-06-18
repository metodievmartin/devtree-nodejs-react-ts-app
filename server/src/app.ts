import express from 'express';

import apiRouter from './routes/api.router';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', apiRouter);

// Error handling middleware
app.use(errorHandler);

export default app;
