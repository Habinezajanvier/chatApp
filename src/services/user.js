import mongoose from 'mongoose';
import { User } from '../database';

export default {
  /**
   * Getting all users
   */
  getAll: async () => {
    const users = await User.find();
    if (users && users.length) return { users };
  },
  /**
   * Getting one user
   */
  getOne: async (condition) => {
    const user = await user.findOne({
      [condition]: condition,
    });
    if (user) return { user };
  },
  /**
   * Create user
   */
  create: async (data) => {
    const newUser = new User({
      ...data,
    });
    const user = await newUser.save();
    return { user };
  },
};
