import { Router } from 'express';
import productsRouter from './api/products.routes.js';
import authRouter from './api/auth.routes.js';

const apiRouter = Router();

apiRouter.use('/api', productsRouter);
apiRouter.use('/api', authRouter);

export default apiRouter;
