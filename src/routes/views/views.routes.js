import { Router } from 'express';
import * as ViewsController from '../../controllers/views.controller.js';

import {
  inyectUser,
  isLogged,
  notLogged,
} from '../../middlewares/secure.middleware.js';
const viewsRouter = Router();

viewsRouter.get('/register', inyectUser, isLogged, ViewsController.GETRegister);

viewsRouter.get('/login', inyectUser, isLogged, ViewsController.GETLogin);

viewsRouter.get(
  '/products',
  inyectUser,
  notLogged,
  ViewsController.GETProducts
);

viewsRouter.get('/cart', inyectUser, notLogged, ViewsController.GETCart);

export default viewsRouter;
