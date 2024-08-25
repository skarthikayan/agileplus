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

/**
 * @openapi
 * components:
 *  schemas:
 *   user:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Karthikayan
 *       nickname:
 *         type: string
 *         example: Karthi
 *       email:
 *         type: string
 *         example: skarthikayan7@gmail.com
 *       empid:
 *         type: number
 *         example: 12345
 *       status:
 *         type: boolean
 *         example: true
 *       role:
 *         type: string
 *         example: USER
 *         enum:
 *           - USER
 *           - SCRUM_MASTER
 */

/**
 * @openapi
 * components:
 *  requestBodies:
 *    userDetails:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 */

/**
 * @openapi
 * components:
 *  responses:
 *   userList:
 *     description: Ok
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 200
 *             message:
 *               type: string
 *               example: success
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/user'
 *                   - $ref: '#/components/schemas/default'
 *   userDetails:
 *     description: Ok
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 200
 *             message:
 *               type: string
 *               example: success
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *               allOf:
 *                 - $ref: '#/components/schemas/user'
 *                 - $ref: '#/components/schemas/default'
 */

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - User
 *     summary: List all Users
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/userList'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/', usersListHandler);

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - User
 *     summary: Create new user
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/userDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     requestBody:
 *       description: Create a new user
 *       $ref: '#/components/requestBodies/userDetails'
 *       required: true
 */
router.post('/', validateData(UserCreateSchema), userCreateHandler);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Show user Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/userDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of user to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.get('/:id', validateData(IdParamSchema), userShowHandler);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Edit User Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/userDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of user to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Create a new user
 *       $ref: '#/components/requestBodies/userDetails'
 *       required: true
 */
router.patch('/:id', validateData(UserUpdateSchema), userUpdateHandler);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete User Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/userDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of user to delte
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.delete('/:id', validateData(IdParamSchema), userDeleteHandler);

export default router;
