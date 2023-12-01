import * as ViewsService from '../services/views.service.js';

export const GETIndex = (req, res, next) => {
  try {
    res.render('index', { menuOptions: req.headerUI, script: '/js/index.js' });
  } catch (error) {
    next(error);
  }
};

export const GETRegister = async (req, res, next) => {
  console.log(req.headerUI);
  try {
    res.render('register', {
      menuOptions: req.headerUI,
      script: '/js/form.js',
    });
  } catch (error) {
    next(error);
  }
};

export const GETLogin = async (req, res, next) => {
  try {
    res.render('login', { menuOptions: req.headerUI, script: '/js/form.js' });
  } catch (error) {
    next(error);
  }
};

export const GETProducts = async (req, res, next) => {
  const { limit = 10, page = 1, sort = 1 } = req.query;
  try {
    const products = await ViewsService.getProducts({
      limit,
      page,
      sort: { price: sort },
      lean: true,
    });
    res.render('products', {
      data: products.data.docs,
      menuOptions: req.headerUI,
      script: '/js/products.js',
    });
  } catch (error) {
    next(error);
  }
};

export const GETCart = async (req, res, next) => {
  const { user } = req.user;
  try {
    const products = await ViewsService.getCart(user.cart);
    const data = products.data.products.map((item) => ({
      ...item.product._doc,
      quantity: item.quantity,
    }));
    res.render('cart', { data, menuOptions: req.headerUI });
  } catch (error) {
    next(error);
  }
};

export const GETEditProduct = async (req, res, next) => {
  const { pid } = req.params;
  const { user, sub } = req.user;
  try {
    const product = await ViewsService.getProductById(pid);
    res.render('editProduct', {
      data: { ...product.data._doc },
      menuOptions: req.headerUI,
    });
  } catch (error) {
    next(error);
  }
};

export const GETAddProduct = async (req, res, next) => {
  try {
    res.render('addProduct', { menuOptions: req.headerUI });
  } catch (error) {
    next(error);
  }
};
