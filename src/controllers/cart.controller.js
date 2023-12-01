import * as CartService from '../services/cart.service.js';
import CustomError from '../utils/customError.js';
import ERROR_DICTIONARY from '../config/errorDictionary.js';
import { generateToken } from '../utils/jwt.js';

export const GETCart = async (req, res, next) => {
  const { user } = req.user;
  try {
    if (!user.cart) return CustomError.create(ERROR_DICTIONARY.default);
    const cart = await CartService.getCartById(user.cart);
    res.status(200).json(cart);
  } catch (error) {
    error.from = 'CONTROLLER';
    next(error);
  }
};

export const POSTNewCart = async (req, res, next) => {
  try {
    // 1. Valido si ya tiene carrito
    const { sub, user } = req.user;
    if (user.cart) return CustomError.create(ERROR_DICTIONARY.forbidden);
    // 2. Creo el nuevo carrito
    const newCart = await CartService.createNewCart(sub);
    // Actualizar token y cookie
    const updatedToken = generateToken(newCart.data);
    res.cookie('accessToken', updatedToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json(newCart);
  } catch (error) {
    error.from = 'CONTROLLER';
    next(error);
  }
};

export const POSTAddToCart = async (req, res, next) => {
  const { user } = req.user;
  try {
    const cart = await CartService.addToCart(user.cart, req.productID);
    if (cart.error) return CustomError.create(ERROR_DICTIONARY.default);
    res.status(201).json(cart);
  } catch (error) {
    error.from = 'CONTROLLER';
    next(error);
  }
};

export const PUTUpdateCart = async (req, res, next) => {
  const { user } = req.user;
  try {
    if (!user.cart) return CustomError.create(ERROR_DICTIONARY.default);
    const cart = await CartService.updateCart(user.cart, req.productID);
    res.status(200).json(cart);
  } catch (error) {
    error.from = 'CONTROLLER';
    next(error);
  }
};

export const DELETEProductToCart = async (req, res, next) => {
  const { user } = req.user;
  const { pid } = req.params;
  try {
    const cart = await CartService.deleteProductToCart(user.cart, pid);
    if (!cart) return CustomError.create(ERROR_DICTIONARY.default);
    res.status(200).json(cart);
  } catch (error) {
    error.from = 'CONTROLLER';
    next(error);
  }
};

export const DELETECart = async (req, res, next) => {
  const { user } = req.user;
  try {
    const cart = await CartService.emptyCart(user.cart);
    if (!cart) return CustomError.create(ERROR_DICTIONARY.default);
    res.status(200).json(cart);
  } catch (error) {
    error.from = 'CONTROLLER';
    next(error);
  }
};
