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

/**
 * @openapi
 * components:
 *  schemas:
 *   sprint:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Sprint name
 *       start_date:
 *         type: string
 *         example: '2024-08-21T19:13:08.440Z'
 *       end_date:
 *         type: string
 *         example: '2024-08-21T19:13:08.440Z'
 *       status:
 *         type: boolean
 *         example: true
 */

/**
 * @openapi
 * components:
 *  requestBodies:
 *   sprintDetails:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/sprint'
 */

/**
 * @openapi
 * components:
 *  responses:
 *   sprintList:
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
 *                   - $ref: '#/components/schemas/sprint'
 *                   - $ref: '#/components/schemas/default'
 *   sprintDetails:
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
 *                 - $ref: '#/components/schemas/sprint'
 *                 - $ref: '#/components/schemas/default'
 */

/**
 * @openapi
 * /sprints:
 *   get:
 *     tags:
 *       - Sprint
 *     summary: List all Sprints
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/sprintList'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */

router.get('/', sprintListHandler);

/**
 * @openapi
 * /sprints:
 *   post:
 *     tags:
 *       - Sprint
 *     summary: Create new sprint
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/sprintDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     requestBody:
 *      description: Create a new sprint
 *      $ref: '#/components/requestBodies/sprintDetails'
 *      required: true
 */
router.post('/', validateData(SprintCreateSchema), sprintCreateHandler);

/**
 * @openapi
 * /sprints/{id}:
 *   get:
 *     tags:
 *       - Sprint
 *     summary: Show sprint Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/sprintDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of sprint to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.get('/:id', validateData(IdParamSchema), sprintShowHandler);

/**
 * @openapi
 * /sprints/{id}:
 *   patch:
 *     tags:
 *       - Sprint
 *     summary: Edit Sprint Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/sprintDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of sprint to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Create a new sprint
 *       $ref: '#/components/requestBodies/sprintDetails'
 *       required: true
 */
router.patch('/:id', validateData(SprintUpdateSchema), sprintUpdateHandler);

/**
 * @openapi
 * /sprints/{id}:
 *   delete:
 *     tags:
 *       - Sprint
 *     summary: Delete Sprint Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/sprintDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of sprint to delte
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.delete('/:id', validateData(IdParamSchema), sprintDeleteHandler);

export default router;
