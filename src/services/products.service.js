import dao from '../dao/factory.js';

const { Product } = dao;
const products = new Product();

export const addProduct = async (data) => {
  try {
    // 1. valido si ya existe el producto
    // 2. Creo el producto
    const response = await products.create(data);
    if (!response) return null;
    // 3. Envio respuesta al controller
    return {
      error: false,
      data: response,
      message: 'Product created successflly',
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};

export const getProducts = async () => {
  try {
    // 1. Fetch de los productos
    const response = await products.find();
    if (response.length === 0) return null;
    // 2. Enviar respuesta al controller
    return {
      error: false,
      data: response,
      message: 'Products retrieved successflly',
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    // 1. Fetch del producto
    const response = await products.findById(id);
    if (!response) return null;
    // 2. Enviar respuesta al controller
    return {
      error: false,
      data: response,
      message: 'Product retrieved successflly',
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    // 1. Actualizar producto
    const response = await products.findByIdAndUpdate(id, data);
    if (!response) return null;
    // 2. Enviar respuesta al controller
    return {
      error: false,
      data: response,
      message: 'Product updated successflly',
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};

export const deletedProduct = async (id) => {
  try {
    // 1. Eliminar producto
    const response = await products.findByIdAndDelete(id);
    if (!response) return null;
    // 2. Enviar respuesta al controller
    return {
      error: false,
      data: response,
      message: 'Product deleted successflly',
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};
