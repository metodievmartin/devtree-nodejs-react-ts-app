import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';

const apiRouter = Router();

// API routes
apiRouter.get('/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

apiRouter.get('/protected', authenticate, (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

export default apiRouter;
