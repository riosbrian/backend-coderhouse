import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const cartSchema = new Schema({
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

cartSchema.pre('findOne', function () {
  this.populate('products.product');
});

cartSchema.plugin(paginate);
const CartModel = model('carts', cartSchema);
export default CartModel;
