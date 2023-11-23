import * as AuthService from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.js';

export const POSTRegister = async (req, res, next) => {
  const userData = req.body;
  try {
    // 1. Registrar al usuario
    const user = await AuthService.register(userData);
    // 2. Generar token y guardarlo en una cookie
    const token = generateToken(user.data);
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    // 3. Envio la respuesta
    res.status(201).json(user);
  } catch (error) {
    error.from = error.from || 'CONTROLLER';
    next(error);
  }
};

export const POSTLogin = async (req, res, next) => {
  const userData = req.body;
  try {
    // 1. Logueo al usaurio
    const user = await AuthService.login(userData);
    // 2. Generar token y guardarlo en una cookie
    const token = generateToken(user.data);
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    // 3. Envio la respuesta
    res.status(200).json(user);
  } catch (error) {
    error.from = error.from || 'CONTROLLER';
    next(error);
  }
};

export const POSTLogout = async (req, res, next) => {
  try {
    // 1. Elimino el token y la cookie
    res.clearCookie('accessToken');
    // 2. Limpio el req.user
    delete req.user;
    // 3. Envio la respuesta
    res.status(200).json({
      error: false,
      message: 'Session closed successfully',
    });
  } catch (error) {
    error.from = error.from || 'controller';
    return next(error);
  }
};
