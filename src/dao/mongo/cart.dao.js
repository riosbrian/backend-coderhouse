import CartModel from "./models/cart.model.js";

export default class CartDAO {
  constructor() {
    this.model = CartModel;
  }

  create = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  };

  find = async () => {
    try {
      return await this.model.find();
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  };

  findById = async (id) => {
    try {
      return await this.model.findById(id);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  };

  findFiltered = async (id, options) => {
    try {
      return await this.model.paginate({ _id: id }, options);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  };

  findByIdAndUpdate = async (id, data) => {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  };

  findByIdAndDelete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  };

  save = async (cart) => {
    return await cart.save();
  };
}
