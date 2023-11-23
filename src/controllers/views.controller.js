import * as ViewsService from '../services/views.service.js';

export const GETRegister = async (req, res, next) => {
  try {
    res.render('register');
  } catch (error) {
    next(error);
  }
};

export const GETLogin = async (req, res, next) => {
  try {
    res.render('login');
  } catch (error) {
    next(error);
  }
};

export const GETProducts = async (req, res, next) => {
  // RECORDAR LAS QUERIES
  try {
    const products = await ViewsService.getProducts();
    res.render('products', { data: products.data });
  } catch (error) {
    next(error);
  }
};
