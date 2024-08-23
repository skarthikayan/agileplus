import 'dotenv/config';
import express, { type Express } from 'express';
import logger from 'morgan';
import cors from 'cors';

import constants from './configs/constants';
import indexRouter from './routes/index';
import userRouter from './routes/users';

const app: Express = express();
const port = process.env.API_PORT || 3000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use(constants.baseUrl + '/users', userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
