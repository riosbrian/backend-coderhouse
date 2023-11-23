import { Router } from 'express';
import * as AuthController from '../../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/auth/register', AuthController.POSTRegister);
authRouter.post('/auth/login', AuthController.POSTLogin);
authRouter.post('/auth/logout', AuthController.POSTLogout);

export default authRouter;
