import express from 'express';

import apiRouter from './routes/api.router';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', apiRouter);

export default app;
