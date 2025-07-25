import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import userRouter from './users/user.router';

const apiRouter = Router();

// Mount user routes
apiRouter.use('/users', userRouter);

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
