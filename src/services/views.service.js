import dao from '../dao/factory.js';

const { Product, User, Cart } = dao;
const productDAO = new Product();
const userDAO = new User();
const cartDAO = new Cart();

export const getProducts = async (queries) => {
  try {
    const response = await productDAO.findFiltered(queries);
    return {
      error: false,
      data: response,
      message: 'products retrieved successfuly',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await productDAO.findById(id);
    return {
      error: false,
      data: response,
      message: 'product retrieved successfuly',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};

export const getCart = async (id) => {
  try {
    const response = await cartDAO.findById(id);
    return {
      error: false,
      data: response,
      message: 'Products retrieved successfuly',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};
