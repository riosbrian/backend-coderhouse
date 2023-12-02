import * as ViewsService from '../services/views.service.js';

export const GETIndex = (req, res, next) => {
  try {
    res.render('index', { menuOptions: req.headerUI, script: '/js/index.js' });
  } catch (error) {
    next(error);
  }
};

export const GETRegister = async (req, res, next) => {
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
  let role;
  if (req.user) {
    role = req.user.user.role;
  } else {
    role = 'notLogged';
  }
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
      role,
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
  try {
    const product = await ViewsService.getProductById(pid);
    res.render('editProduct', {
      data: { ...product.data._doc },
      userID: req.user.sub,
      menuOptions: req.headerUI,
      script: '/js/editProduct.js',
    });
  } catch (error) {
    next(error);
  }
};

export const GETAddProduct = async (req, res, next) => {
  try {
    res.render('addProduct', {
      menuOptions: req.headerUI,
      userID: req.user.sub,
      script: '/js/addProduct.js',
    });
  } catch (error) {
    next(error);
  }
};

export const GETPremium = async (req, res, next) => {
  try {
    res.render('premium', {
      menuOptions: req.headerUI,
      script: '/js/premium.js',
    });
  } catch (error) {
    next(error);
  }
};
