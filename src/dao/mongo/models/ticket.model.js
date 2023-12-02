import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

/* ticketSchema.pre('findOne', function () {
  this.populate('products.product');
}); */

const TicketModel = model('tickets', ticketSchema);
export default TicketModel;
