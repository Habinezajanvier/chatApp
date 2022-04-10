import db from '../database';

const { User } = db;

export default {
  /**
   * Getting all users
   */
  getAll: async () => {
    const users = await User.find();
    const data = users.map((user) => {
      return {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      };
    });
    if (users && users.length) return { users: data };
  },
  /**
   * Getting one user
   * @param {Object} condition to filter against
   * @param {Boolean} password true if password have to be retrieved
   */
  getOne: async (condition, password) => {
    const user = await User.findOne(condition);
    if (user)
      return {
        _id: user._id,
        fullName: user.fullName,
        password: password ? user.password : undefined,
        email: user.email,
      };
  },
  /**
   * Create user
   */
  create: async (data) => {
    const newUser = new User({
      ...data,
    });
    const user = await newUser.save();
    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
  },
};
