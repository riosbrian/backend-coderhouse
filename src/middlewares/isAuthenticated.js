import ERROR_DICTIONARY from '../config/errorDictionary.js';
import CustomError from '../utils/customError.js';

export default (req, res, next) => {
  try {
    if (!req.user) return CustomError.create(ERROR_DICTIONARY.auth);
    next();
  } catch (error) {
    error.from = 'IS AUTHENTICATED';
    next(error);
  }
};
