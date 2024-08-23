import express, { type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import {
  SprintCreateSchema,
  SprintUpdateSchema,
} from '../schemas/sprint-schemas';
import { IdParamSchema } from '../schemas/common-schemas';
import {
  sprintListHandler,
  sprintShowHandler,
  sprintCreateHandler,
  sprintUpdateHandler,
  sprintDeleteHandler,
} from '../controllers/sprints';

const router: Router = express.Router();

router.get('/', sprintListHandler);

router.post('/', validateData(SprintCreateSchema), sprintCreateHandler);

router.get('/:id', validateData(IdParamSchema), sprintShowHandler);

router.patch('/:id', validateData(SprintUpdateSchema), sprintUpdateHandler);

router.delete('/:id', validateData(IdParamSchema), sprintDeleteHandler);

export default router;
