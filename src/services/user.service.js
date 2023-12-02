import dao from '../dao/factory.js';
import UserDTO from '../dao/dto/user.dto.js';

const { User } = dao;
const userDAO = new User();

export const updateUserRole = async (id, role) => {
  try {
    const user = await userDAO.findByIdAndUpdate(id, { role });
    const response = new UserDTO(user);
    return {
      error: false,
      data: response,
      message: 'User role updated successflly',
    };
  } catch (error) {
    error.from = 'SERVICE';
    throw error;
  }
};
