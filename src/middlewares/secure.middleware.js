import { cookieExtractor } from '../utils/cookieExtractor.js';
import { verifyToken } from '../utils/jwt.js';

export const inyectUser = async (req, res, next) => {
  let isValid = false;
  try {
    const token = await cookieExtractor(req.cookies);
    if (token) isValid = verifyToken(token);
    if (!isValid) {
      req.user = null;
      return next();
    }
    req.user = isValid;
    next();
  } catch (error) {
    error.from = 'SECURE MIDDLEWARE';
    next(error);
  }
};

export const isLogged = async (req, res, next) => {
  if (req.user) return res.redirect('/products');
  next();
};

export const notLogged = async (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  next();
};
