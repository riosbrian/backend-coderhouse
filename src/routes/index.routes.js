import { Router } from 'express';
import viewsRoutes from './views/views.routes.js';
const indexRouter = Router();

indexRouter.use('/', viewsRoutes);

export default indexRouter;
