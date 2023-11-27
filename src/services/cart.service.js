import UserDTO from '../dao/dto/user.dto.js';
import dao from '../dao/factory.js';

const { Cart, User } = dao;
const cartDAO = new Cart();
const userDAO = new User();

export const createNewCart = async (id) => {
  try {
    // 1. Crear carrito
    const cart = await cartDAO.create();
    // 2. Actualizar usuario
    const updateUser = await userDAO.findByIdAndUpdate(id, { cart });
    const response = new UserDTO(updateUser);
    return {
      error: false,
      data: response,
      message: `Cart created successflly for user: ${response.id}`,
    };
  } catch (error) {
    error.from = error.from || 'SERVICE';
    throw error;
  }
};

export const getCartById = async (id) => {
  try {
    const response = await cartDAO.findById(id);
    return {
      error: false,
      data: response,
      message: 'Cart retrieved successfully',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};

export const updateCart = async (id, pid) => {
  try {
    const cart = await cartDAO.findById(id);
    const index = cart.products.findIndex((p) => p.product._id == pid);

    if (index > -1) {
      cart.products[index].quantity -= 1;
      if (cart.products[index].quantity <= 0) cart.products.splice(index, 1);
      await cartDAO.save(cart);
    }

    return {
      error: false,
      data: cart,
      message: 'Cart updated successfully',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};

export const addToCart = async (id, pid) => {
  try {
    const cart = await cartDAO.findById(id);
    const index = cart.products.findIndex((p) => p.product._id == pid);

    if (index > -1) {
      const stock = cart.products[index].product.stock;
      cart.products[index].quantity += 1;
      if (cart.products[index].quantity > stock)
        throw new Error('Stock insuficiente');
      await cartDAO.save(cart);
    } else {
      cart.products.push({ product: pid });
      await cartDAO.save(cart);
    }
    return {
      error: false,
      data: cart,
      message: 'Product added successfully',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};

export const deleteProductToCart = async (id, pid) => {
  try {
    const cart = await cartDAO.findById(id);
    const index = cart.products.findIndex((p) => p.product._id == pid);
    cart.products.splice(index, 1);
    await cartDAO.save(cart);

    return {
      error: false,
      data: cart,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};

export const emptyCart = async (id) => {
  try {
    const cart = await cartDAO.findById(id);
    cart.products = [];
    await cartDAO.save(cart);

    return {
      error: false,
      data: cart,
      message: 'Cart emptied successfully',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};
