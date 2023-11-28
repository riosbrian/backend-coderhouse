import * as TicketsServices from '../services/tickets.service.js';
import { generateToken } from '../utils/jwt.js';

export const POSTPurchase = async (req, res, next) => {
  const { sub, user } = req.user;
  console.log('CTLR', sub, user);
  try {
    const ticket = await TicketsServices.createTicket(sub, user.cart);
    console.log(ticket);
    // PORQUE FLASHEE QUE TENIA QUE GUARDAR DE NUEVO EL TOKEN
    /* const updatedToken = generateToken({
      id: sub,
      cart: ticket.data.cart,
      ...user,
    });
    res.cookie('accessToken', updatedToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    }); */
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};
