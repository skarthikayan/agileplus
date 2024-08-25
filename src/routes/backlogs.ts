import express, { type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import {
  BacklogCreateSchema,
  BacklogListSchema,
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

/**
 * @openapi
 * components:
 *  schemas:
 *   backlog:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Backlog Name
 *       story_points:
 *         type: number
 *         example: 1
 *       status:
 *         type: string
 *         example: true
 *         enum:
 *           - NEW
 *           - IN_PROGRESS
 *           - COMPLETED
 *       sprint_id:
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
 *   backlogDetails:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/backlog'
 */

/**
 * @openapi
 * components:
 *  responses:
 *   backlogList:
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
 *                   - $ref: '#/components/schemas/backlog'
 *                   - $ref: '#/components/schemas/default'
 *   backlogDetails:
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
 *                 - $ref: '#/components/schemas/backlog'
 *                 - $ref: '#/components/schemas/default'
 */

/**
 * @openapi
 * /backlogs:
 *   get:
 *     tags:
 *       - Backlog
 *     summary: List all Backlogs
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/backlogList'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/', validateData(BacklogListSchema), backlogListHandler);

/**
 * @openapi
 * /backlogs:
 *   post:
 *     tags:
 *       - Backlog
 *     summary: Create new backlog
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/backlogDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     requestBody:
 *       description: Create a new backlog
 *       $ref: '#/components/requestBodies/backlogDetails'
 *       required: true
 */
router.post('/', validateData(BacklogCreateSchema), backlogCreateHandler);

/**
 * @openapi
 * /backlogs/{id}:
 *   get:
 *     tags:
 *       - Backlog
 *     summary: Show backlog Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/backlogDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of backlog to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.get('/:id', validateData(IdParamSchema), backlogShowHandler);

/**
 * @openapi
 * /backlogs/{id}:
 *   patch:
 *     tags:
 *       - Backlog
 *     summary: Edit Backlog Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/backlogDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of backlog to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Create a new backlog
 *       $ref: '#/components/requestBodies/backlogDetails'
 *       required: true
 */
router.patch('/:id', validateData(BacklogUpdateSchema), backlogUpdateHandler);

/**
 * @openapi
 * /backlogs/{id}:
 *  delete:
 *   tags:
 *     - Backlog
 *   summary: Delete Backlog Details
 *   responses:
 *     '200':
 *       $ref: '#/components/responses/backlogDetails'
 *     '404':
 *       $ref: '#/components/responses/notFound'
 *     '500':
 *       $ref: '#/components/responses/internalServerError'
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID of backlog to delte
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 */
router.delete('/:id', validateData(IdParamSchema), backlogDeleteHandler);

export default router;
