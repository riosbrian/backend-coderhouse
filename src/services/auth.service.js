import ERROR_DICTIONARY from '../config/errorDictionary.js';
import UserDTO from '../dao/dto/user.dto.js';
import dao from '../dao/factory.js';
import CustomError from '../utils/customError.js';
import { hashPassword, validatePassword } from '../utils/handlePassword.js';

const { User, Cart } = dao;
const userDAO = new User();
const cartDAO = new Cart();

export const register = async (data) => {
  try {
    // 1. Hashear contraseña
    data.password = await hashPassword(data.password);
    // 2. Verificar que el usuario no este registrado
    const alreadyRegistered = await userDAO.findOne(data.email);
    if (alreadyRegistered)
      return CustomError.create(ERROR_DICTIONARY.registered);
    // 3. Registrar al usuario
    const cart = await cartDAO.create();
    const response = await userDAO.create({ ...data, cart: cart._id });
    return {
      error: false,
      data: response,
      message: 'User register successflly',
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};

export const login = async (data) => {
  try {
    // 1.Verifico el usuario
    const user = await userDAO.findOne(data.email);
    if (!user) CustomError.create(ERROR_DICTIONARY.auth);
    // 2. Verifico el password
    const validPassword = await validatePassword(data.password, user);
    if (!validPassword) CustomError.create(ERROR_DICTIONARY.auth);
    // 3. Envio respuesta al controller
    const response = new UserDTO(user);
    return {
      error: false,
      data: response,
      message: 'User logged successflly',
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};
