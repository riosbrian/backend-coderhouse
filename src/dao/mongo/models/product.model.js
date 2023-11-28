import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
  title: { type: String, required: [true, 'A product must have a name'] },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
  },
  price: { type: Number, required: [true, 'A product must have a price'] },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, index: true, unique: true },
  stock: { type: Number, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

productSchema.plugin(paginate);
const ProductModel = model('products', productSchema);
export default ProductModel;
