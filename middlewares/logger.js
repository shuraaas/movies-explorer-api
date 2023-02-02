import winston from 'winston';
import { logger } from 'express-winston';

const requestLogger = logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = logger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

export {
  requestLogger,
  errorLogger,
};
