import express, { type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import {
  TaskCreateSchema,
  TaskListSchema,
  TaskUpdateSchema,
} from '../schemas/task-schemas';
import { IdParamSchema } from '../schemas/common-schemas';
import {
  taskCreateHandler,
  taskDeleteHandler,
  taskListHandler,
  taskShowHandler,
  taskUpdateHandler,
} from '../controllers/tasks';

const router: Router = express.Router();

router.get('/', validateData(TaskListSchema), taskListHandler);

router.post('/', validateData(TaskCreateSchema), taskCreateHandler);

router.get('/:id', validateData(IdParamSchema), taskShowHandler);

router.patch('/:id', validateData(TaskUpdateSchema), taskUpdateHandler);

router.delete('/:id', validateData(IdParamSchema), taskDeleteHandler);

export default router;
