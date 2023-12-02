import * as UsersService from '../services/user.service.js';
import { generateToken } from '../utils/jwt.js';

export const PUTUpdateRole = async (req, res, next) => {
  const { sub } = req.user;
  const { convertRoleTo } = req.body;
  try {
    const user = await UsersService.updateUserRole(sub, convertRoleTo);
    const updatedToken = generateToken(user.data);
    res.cookie('accessToken', updatedToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json(user);
  } catch (error) {
    error.from = 'CONTROLLER';
    next(error);
  }
};
