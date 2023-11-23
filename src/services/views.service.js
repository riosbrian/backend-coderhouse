import dao from '../dao/factory.js';

const { Product, User } = dao;
const productDAO = new Product();
const userDAO = new User();

export const getProducts = async () => {
  // RECORDAR LAS QUERIES
  try {
    const response = await productDAO.find();
    return {
      error: false,
      data: response,
      message: 'products retrieved successfuly',
    };
  } catch (error) {
    throw error;
  }
};
