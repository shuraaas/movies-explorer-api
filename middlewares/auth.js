import jwt from 'jsonwebtoken';
import { UnAuthtorizedErr } from '../errors/index.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthtorizedErr('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new UnAuthtorizedErr('Необходима авторизация'));
    }
    return next(err);
  }

  req.user = payload;
  return next();
};

export { auth };
