import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;
const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

export { generateToken };
