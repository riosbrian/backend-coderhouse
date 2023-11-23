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
  const { limit = 10, page = 1, sort = 1 } = req.query;
  const { user } = req.user;
  const role = user.role === 'admin' || user.role === 'premium' ? true : false;
  try {
    const products = await ViewsService.getProducts({
      limit,
      page,
      sort: { price: sort },
      lean: true,
    });
    res.render('products', { data: products.data.docs, role });
  } catch (error) {
    next(error);
  }
};
