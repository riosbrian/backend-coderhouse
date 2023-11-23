import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: [true, 'A user must have a name'] },
  lastname: { type: String, required: [true, 'A user must have a lastname'] },
  username: { type: String, required: [true, 'A user must have a username'] },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
  },
  age: Number,
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'carts',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

const UserModel = model('users', userSchema);
export default UserModel;
