import express, { type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import { UserCreateSchema, UserUpdateSchema } from '../schemas/user-schemas';
import { IdParamSchema } from '../schemas/common-schemas';
import {
  userCreateHandler,
  userDeleteHandler,
  userShowHandler,
  usersListHandler,
  userUpdateHandler,
} from '../controllers/users';

const router: Router = express.Router();

router.get('/', usersListHandler);

router.post('/', validateData(UserCreateSchema), userCreateHandler);

router.get('/:id', validateData(IdParamSchema), userShowHandler);

router.patch('/:id', validateData(UserUpdateSchema), userUpdateHandler);

router.delete('/:id', validateData(IdParamSchema), userDeleteHandler);

export default router;
