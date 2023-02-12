import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import { generateToken } from '../utils/jwt.js';
import {
  USER_NOT_FOUND,
  USER_BAD_REQUEST,
  MONGO_DUPLICATE_ERROR_CODE,
  SOLT_ROUNDS,
} from '../utils/constants.js';
import {
  BadRequestErr,
  MongoDuplicateErr,
  NotFoundError,
} from '../errors/index.js';

const registerUser = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hash = await bcrypt.hash(password, SOLT_ROUNDS);
    const newUser = await User.create({ ...req.body, password: hash });
    res.send({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestErr(USER_BAD_REQUEST));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new MongoDuplicateErr('Такой пользователь уже существует'));
    } else {
      next(err);
    }
  }
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials({ email, password });
    const token = generateToken({ _id: user._id });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);
    if (currentUser) {
      res.send(currentUser);
    } else {
      throw new NotFoundError(USER_NOT_FOUND);
    }
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestErr(USER_BAD_REQUEST));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new MongoDuplicateErr('Такой пользователь уже существует'));
    } else {
      next(err);
    }
  }
};

export {
  authUser,
  registerUser,
  getCurrentUser,
  updateUserProfile,
};
