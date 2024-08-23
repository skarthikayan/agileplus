import express, { type Request, type Response, type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import { UserCreateSchema, UserUpdateSchema } from '../schemas/user-schemas';
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

router.get('/:id', userShowHandler);

router.patch('/:id', validateData(UserUpdateSchema), userUpdateHandler);

router.delete('/:id', userDeleteHandler);

export default router;
