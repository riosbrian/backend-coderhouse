import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const SECRET = config.JWT_SECRET;

export const generateToken = (data) => {
  const userData = {
    sub: data.id,
    user: { username: data.username, role: data.role },
  };
  return jwt.sign(userData, SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
