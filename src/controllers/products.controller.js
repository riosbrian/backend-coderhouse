import * as ProductsService from '../services/products.service.js';
import CustomError from '../utils/customError.js';
import ERROR_DICTIONARY from '../config/errorDictionary.js';

export const GETProducts = async (req, res, next) => {
  const { limit = 10, page = 1, sort = 1 } = req.query;
  try {
    const products = await ProductsService.getProducts({
      limit,
      page,
      sort: { price: sort * 1 },
      lean: true,
    });
    res.status(200).json(products);
  } catch (error) {
    error.from = error.from || 'CONTROLLER';
    next(error);
  }
};

export const GETProductById = async (req, res, next) => {
  try {
    const product = await ProductsService.getProductById(req.productID);
    if (!product) return CustomError.create(ERROR_DICTIONARY.notFound);
    res.status(200).json(product);
  } catch (error) {
    error.from = error.from || 'CONTROLLER';
    next(error);
  }
};

export const POSTNewProduct = async (req, res, next) => {
  const { user } = req.user;
  const role = user.role;
  const productData = req.body;
  try {
    // 1. Valido el rol del usuario
    if (role === 'user') return CustomError.create(ERROR_DICTIONARY.forbidden);
    // 2. Creo el nuevo producto
    const newProduct = await ProductsService.addProduct(productData);
    if (!newProduct) return CustomError.create(ERROR_DICTIONARY.default);
    // 3. Envio la respesta
    res.status(201).json(newProduct);
  } catch (error) {
    error.from = error.from || 'CONTROLLER';
    next(error);
  }
};

export const PUTUpdateProduct = async (req, res, next) => {
  /* const { role } = req.user; */
  const productData = req.body;
  try {
    // 1. Valido el rol del usuario
    // if (role === 'user') return CustomError.create(ERROR_DICTIONARY.forbidden);
    // 2. Actualizo el producto
    const updatedProduct = await ProductsService.updateProduct(
      req.productID,
      productData
    );
    if (!updatedProduct) return CustomError.create(ERROR_DICTIONARY.default);
    // Envio la respuesta
    res.status(201).json(updatedProduct);
  } catch (error) {
    error.from = error.from || 'CONTROLLER';
    next(error);
  }
};

export const DELETEProduct = async (req, res, next) => {
  /* const { role } = req.user; */
  try {
    // 1. Valido el rol del usuario
    // if (role === 'user') return CustomError.create(ERROR_DICTIONARY.forbidden);
    const deletedProduct = await ProductsService.deletedProduct(req.productID);
    if (!deletedProduct)
      return CustomError.create(ERROR_DICTIONARY.notFoundOne);
    // 2. Envio la respuesta
    res.status(200).json(deletedProduct);
  } catch (error) {
    error.from = error.from || 'CONTROLLER';
    next(error);
  }
};
