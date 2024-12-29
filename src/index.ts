import 'dotenv/config';
import express, { type Express } from 'express';
import logger from 'morgan';
import cors from 'cors';
import openapiUI from 'swagger-ui-express';
import openApiDocs from './configs/openapi.js';

import constants from './configs/constants';
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import sprintRoute from './routes/sprints';
import backlogRoute from './routes/backlogs';
import taskRoute from './routes/tasks';

import { protectedRoute } from './middlewares/jwt';

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
app.use('/api-docs', openapiUI.serve, openapiUI.setup(openApiDocs));

app.use(constants.baseUrl + '/auth', authRouter);
app.use(constants.baseUrl + '/users', protectedRoute, userRouter);
app.use(constants.baseUrl + '/sprints', protectedRoute, sprintRoute);
app.use(constants.baseUrl + '/backlogs', protectedRoute, backlogRoute);
app.use(constants.baseUrl + '/tasks', protectedRoute, taskRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
