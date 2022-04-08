import bcrypt from 'bcryptjs';
import { encode } from '../helpers/jwtFunctions';
import user from '../services/user';

/**
 * Signup
 * @param {Object} req
 * @param {Object} res
 * @returns {String} Returns token for authentication
 */
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  const emailExist = await user.getOne(email);
  if (emailExist) {
    return res
      .status(409)
      .json({ error: 'Email already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await user.create({
    fullname,
    email,
    password: hashedPassword,
  });

  const token = encode({
    _id: newUser._id,
    fullname: newUser.fullname,
    email: user.email,
  });
  return res.status(201).json({
    message: 'User created successfully',
    token,
    data: newUser,
  });
};

/**
 * Login
 * @param {Object} req
 * @param {Object} res
 * @returns {String} Returns token for authentication
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const userAccount = await user.getOne(email);
  if (!userAccount) {
    return res
      .status(403)
      .json({ error: 'Email or Password is incorrect' });
  }
  const validPass = await bcrypt.compare(
    password,
    userAccount.password
  );
  if (!validPass) {
    return res
      .status(403)
      .json({ error: 'Email or Password is incorrect' });
  }
  const token = encode({
    _id: userAccount._id,
    fullname: userAccount.fullname,
    email: userAccount.email,
  });
  return res.status(200).json({
    message: 'Loged in successfully',
    token,
  });
};
