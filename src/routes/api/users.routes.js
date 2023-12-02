import { Router } from 'express';
import * as UsersController from '../../controllers/user.controller.js';
import { inyectUser, notLogged } from '../../middlewares/secure.middleware.js';

const usersRouter = Router();

usersRouter.put(
  '/users/premium',
  inyectUser,
  notLogged,
  UsersController.PUTUpdateRole
);

export default usersRouter;
