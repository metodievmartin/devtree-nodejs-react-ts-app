import { Router } from 'express';

const apiRouter = Router();

// API routes
apiRouter.get('/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

export default apiRouter;
