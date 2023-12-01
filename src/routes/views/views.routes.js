import { Router } from 'express';
import * as ViewsController from '../../controllers/views.controller.js';
import setHeader from '../../middlewares/setHeader.js';
import {
  inyectUser,
  isLogged,
  notLogged,
} from '../../middlewares/secure.middleware.js';

const viewsRouter = Router();

viewsRouter.get('/', inyectUser, setHeader, ViewsController.GETIndex);

viewsRouter.get(
  '/register',
  inyectUser,
  isLogged,
  setHeader,
  ViewsController.GETRegister
);

viewsRouter.get(
  '/login',
  inyectUser,
  isLogged,
  setHeader,
  ViewsController.GETLogin
);

viewsRouter.get(
  '/edit/:pid',
  inyectUser,
  notLogged,
  setHeader,
  ViewsController.GETEditProduct
);

viewsRouter.get(
  '/add',
  inyectUser,
  notLogged,
  setHeader,
  ViewsController.GETAddProduct
);

viewsRouter.get(
  '/products',
  inyectUser,
  setHeader,
  ViewsController.GETProducts
);

viewsRouter.get(
  '/carts',
  inyectUser,
  notLogged,
  setHeader,
  ViewsController.GETCart
);

export default viewsRouter;
