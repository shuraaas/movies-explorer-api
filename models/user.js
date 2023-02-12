import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { UnAuthtorizedErr } from '../errors/index.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Не валидный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  versionKey: false,
  statics: {
    async findUserByCredentials({ email, password }) {
      const user = await this.findOne({ email }).select('+password');
      if (!user) {
        throw new UnAuthtorizedErr('Неправильные почта или пароль');
      }

      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new UnAuthtorizedErr('Неправильные почта или пароль');
      }

      return user;
    },
  },
});

const User = mongoose.model('user', userSchema);

export { User };
