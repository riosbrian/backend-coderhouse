import { Router } from 'express';
import {
  inyectUser,
  isLogged,
  notLogged,
} from '../../middlewares/secure.middleware.js';
const viewsRouter = Router();

viewsRouter.get('/register', inyectUser, isLogged, (req, res, next) => {
  res.render('register');
});

viewsRouter.get('/login', inyectUser, isLogged, (req, res, next) => {
  res.render('login');
});

viewsRouter.get('/products', inyectUser, notLogged, (req, res, next) => {
  res.status(200).json({ msg: 'estoy en productos' });
});

export default viewsRouter;
