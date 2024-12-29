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

import { isAdmin } from '../middlewares/role-check';

const router: Router = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   task:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Task-Name
 *       description:
 *         type: string
 *         example: Task Description
 *       hours:
 *         type: number
 *         example: 1
 *       start_date:
 *         type: string
 *         example: '2024-08-21T19:13:08.440Z'
 *       end_date:
 *         type: string
 *         example: '2024-08-21T19:13:08.440Z'
 *       status:
 *         type: string
 *         example: NEW
 *         enum:
 *           - NEW
 *           - IN_PROGRESS
 *           - IN_REVIEW
 *           - DEPLOYED_TO_DEV
 *           - MERGED_TO_MAIN_BRANCH
 *           - DEPLOYED_TO_PROD
 *       backlog_id:
 *         type: number
 *         example: 1
 *       user_id:
 *         type: number
 *         example: 1
 */

/**
 * @openapi
 * components:
 *  requestBodies:
 *   taskDetails:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/task'
 */

/**
 * @openapi
 * components:
 *  responses:
 *   taskList:
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
 *                   - $ref: '#/components/schemas/task'
 *                   - $ref: '#/components/schemas/default'
 *   taskDetails:
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
 *                 - $ref: '#/components/schemas/task'
 *                 - $ref: '#/components/schemas/default'
 */

/**
 * @openapi
 * /tasks:
 *   get:
 *     tags:
 *       - Task
 *     summary: List all Tasks
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/taskList'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/', validateData(TaskListSchema), taskListHandler);

/**
 * @openapi
 * /tasks:
 *   post:
 *     tags:
 *       - Task
 *     summary: Create new task
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/taskDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     requestBody:
 *       description: Create a new task
 *       $ref: '#/components/requestBodies/taskDetails'
 */
router.post('/', isAdmin, validateData(TaskCreateSchema), taskCreateHandler);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Task
 *     summary: Show task Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/taskDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of task to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.get('/:id', validateData(IdParamSchema), taskShowHandler);

/**
 * @openapi
 * /tasks/{id}:
 *   patch:
 *     tags:
 *       - Task
 *     summary: Edit Task Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/taskDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of task to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Create a new task
 *       $ref: '#/components/requestBodies/taskDetails'
 *       required: true
 */
router.patch(
  '/:id',
  isAdmin,
  validateData(TaskUpdateSchema),
  taskUpdateHandler,
);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Task
 *     summary: Delete Task Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/taskDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of task to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.delete('/:id', isAdmin, validateData(IdParamSchema), taskDeleteHandler);

export default router;
