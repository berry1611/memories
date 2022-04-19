import User from '../models/user.js';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { firstName, lastName, ...userData } = req.body;

  try {
    const userExist = await User.findOne({ email: userData.email });
    if (userExist) return res.status(400).json({ data: 'User already exists' });

    if (userData.password !== userData.confirmPassword) return res.status(400).json({ data: 'Password not match' });
    userData.password = await hash(userData.password, 12);
    const createUser = await User.create({ name: `${firstName} ${lastName}`, ...userData });
    const token = jwt.sign({ id: createUser._id, email: createUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ result: createUser, token });
  } catch (error) {
    res.status(500).json({ data: 'Something went wrong' });
  }
};

export const signin = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) return res.status(404).json({ data: 'User not found' });
    const isPasswordCorrect = await compare(req.body.password, userData.password);
    if (!isPasswordCorrect) return res.status(400).json({ data: 'Invalid credentials' });
    const token = jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ result: userData, token });
  } catch (error) {
    res.status(500).json({ data: 'Something went wrong' });
    console.log(error);
  }
};
