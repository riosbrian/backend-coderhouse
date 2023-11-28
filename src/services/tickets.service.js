import dao from '../dao/factory.js';

const { Product, Cart, Ticket } = dao;
const productDAO = new Product();
const ticketDAO = new Ticket();
const cartDAO = new Cart();

export const createTicket = async (id, cid) => {
  try {
    let totalPrice = 0;
    // 1. Busco el carrito
    const cart = await cartDAO.findById(cid);
    // 2. Calculo el precio total y modifico el stock de los productos
    cart.products.map(async ({ product, quantity }) => {
      totalPrice += quantity * product.price;
      await productDAO.findByIdAndUpdate(product._id, {
        stock: product.stock - quantity,
      });
    });
    // 3. Vacio el carrito
    cart.products = [];
    await cartDAO.save(cart);
    // 4. Genero el ticket
    //const response = await ticketDAO.create(id);

    return {
      error: false,
      data: {
        cart,
        total: totalPrice,
      },
      message: 'ticket',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};
