import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

/* ticketSchema.pre('findOne', function () {
  this.populate('products.product');
}); */

const TicketModel = model('tickets', ticketSchema);
export default TicketModel;
