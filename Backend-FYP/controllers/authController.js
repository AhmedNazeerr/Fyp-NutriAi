const { User } = require('../models/Main');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const { hashPassword, comparePassword } = require('../utils/bcryptUtils');

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // Hash the password before storing it
  const hashedPassword = await hashPassword(password);

  // first registered user is an admin
  const userCount = await User.count();
  const role = userCount === 0 ? 'admin' : 'user';

  const user = await User.create({ name, email, password: hashedPassword, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  if(!user.activation_status){
    throw new CustomError.BadRequestError("Your access has been removed, contact customer suport for access")
  }

  // Compare the plain text password with the hashed password from the database
  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
