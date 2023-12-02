import { Router } from 'express';
import * as TicketsController from '../../controllers/tickets.controller.js';
import { inyectUser } from '../../middlewares/secure.middleware.js';

const ticketRouter = Router();

ticketRouter.post('/ticket', inyectUser, TicketsController.POSTPurchase);
ticketRouter.get('/ticket', inyectUser, TicketsController.GETPurchase);

export default ticketRouter;
