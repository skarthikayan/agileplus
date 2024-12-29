import 'dotenv/config';
import express, { type Express } from 'express';
import logger from 'morgan';
import cors from 'cors';
import openapiUI from 'swagger-ui-express';
import openApiDocs from './configs/openapi';

import constants from './configs/constants';
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import sprintRouter from './routes/sprints';
import backlogRouter from './routes/backlogs';
import taskRouter from './routes/tasks';
import projectRouter from './routes/projects';

import authenticateUser from './middlewares/jwt';
import { isAdmin } from './middlewares/role-check';

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
app.use(constants.baseUrl + '/users', authenticateUser, isAdmin, userRouter);
app.use(constants.baseUrl + '/projects', authenticateUser, projectRouter);
app.use(constants.baseUrl + '/sprints', authenticateUser, sprintRouter);
app.use(constants.baseUrl + '/backlogs', authenticateUser, backlogRouter);
app.use(constants.baseUrl + '/tasks', authenticateUser, taskRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
