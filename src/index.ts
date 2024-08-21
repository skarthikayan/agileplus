import 'dotenv/config';
import express, { Express } from 'express';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './controllers/index';

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
