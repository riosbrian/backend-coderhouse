import dao from "../dao/factory.js";
import { v4 as uuidv4 } from "uuid";

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
    const ticket = await ticketDAO.create({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: totalPrice,
      purchaser: id,
    });

    return {
      error: false,
      data: ticket,
      message: "ticket",
    };
  } catch (error) {
    error.from = "SERVICE";
    throw error;
  }
};

export const getTotal = async (id, cid) => {
  try {
    let totalPrice = 0;
    // 1. Busco el carrito
    const cart = await cartDAO.findById(cid);
    // 2. Calculo el precio total y modifico el stock de los productos
    cart.products.map(async ({ product, quantity }) => {
      totalPrice += quantity * product.price;
    });

    return {
      error: false,
      data: totalPrice,
      message: "total cart price",
    };
  } catch (error) {
    error.from = "SERVICE";
    throw error;
  }
};
