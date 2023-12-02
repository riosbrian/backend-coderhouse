import * as TicketsServices from '../services/tickets.service.js';

export const POSTPurchase = async (req, res, next) => {
  const { sub, user } = req.user;
  try {
    const ticket = await TicketsServices.createTicket(sub, user.cart);
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const GETPurchase = async (req, res, next) => {
  const { sub, user } = req.user;
  try {
    const total = await TicketsServices.getTotal(sub, user.cart);
    res.status(200).json(total);
  } catch (error) {}
};
