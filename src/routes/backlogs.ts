import express, { type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import {
  BacklogCreateSchema,
  BacklogUpdateSchema,
} from '../schemas/backlog-schemas';
import { IdParamSchema } from '../schemas/common-schemas';
import {
  backlogCreateHandler,
  backlogDeleteHandler,
  backlogListHandler,
  backlogShowHandler,
  backlogUpdateHandler,
} from '../controllers/backlogs';

const router: Router = express.Router();

router.get('/', backlogListHandler);

router.post('/', validateData(BacklogCreateSchema), backlogCreateHandler);

router.get('/:id', validateData(IdParamSchema), backlogShowHandler);

router.patch('/:id', validateData(BacklogUpdateSchema), backlogUpdateHandler);

router.delete('/:id', validateData(IdParamSchema), backlogDeleteHandler);

export default router;
