import UserModel from './models/user.model.js';

export default class UserDAO {
  constructor() {
    this.model = UserModel;
  }

  create = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      error.from = 'DAO';
      throw error;
    }
  };

  findOne = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      error.from = 'DAO';
      throw error;
    }
  };

  findByIdAndUpdate = async (id, data) => {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      error.from = 'DAO';
      throw error;
    }
  };
}
