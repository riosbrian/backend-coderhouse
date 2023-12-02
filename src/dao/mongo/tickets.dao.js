import TicketModel from './models/ticket.model.js';

export default class TicketDAO {
  constructor() {
    this.model = TicketModel;
  }

  create = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      error.from = 'DAO';
      throw error;
    }
  };
}
