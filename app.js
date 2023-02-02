import './env.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const { PORT, DB_ADDRESS } = process.env;
const app = express();

app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
