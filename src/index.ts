import 'dotenv/config';
import express, { type Express } from 'express';
import logger from 'morgan';
import cors from 'cors';
import openapiUI from 'swagger-ui-express';
import openApiDocs from './configs/openapi';
import fs from 'fs';

import constants from './configs/constants';
import indexRouter from './routes/index';
import userRouter from './routes/users';
import sprintRoute from './routes/sprints';
import backlogRoute from './routes/backlogs';
import taskRoute from './routes/tasks';

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

fs.writeFile(
  './openapi.json',
  JSON.stringify(openApiDocs, null, 2),
  (error) => {
    if (error) console.log('Error updating openapi.json');
    console.log('openapi.json updated');
  },
);
app.use('/api-docs', openapiUI.serve, openapiUI.setup(openApiDocs));
app.use(constants.baseUrl + '/users', userRouter);
app.use(constants.baseUrl + '/sprints', sprintRoute);
app.use(constants.baseUrl + '/backlogs', backlogRoute);
app.use(constants.baseUrl + '/tasks', taskRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
