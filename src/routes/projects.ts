import express, { type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import {
  ProjectCreateSchema,
  ProjectUpdateSchema,
} from '../schemas/project-schemas';
import { IdParamSchema } from '../schemas/common-schemas';
import {
  projectListHandler,
  projectShowHandler,
  projectCreateHandler,
  projectUpdateHandler,
  projectDeleteHandler,
} from '../controllers/projects';
import { isAdmin } from '../middlewares/role-check';

const router: Router = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   project:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Project name
 *       status:
 *         type: boolean
 *         example: true
 */

/**
 * @openapi
 * components:
 *  requestBodies:
 *   projectDetails:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/project'
 */

/**
 * @openapi
 * components:
 *  responses:
 *   projectList:
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
 *                   - $ref: '#/components/schemas/project'
 *                   - $ref: '#/components/schemas/default'
 *   projectDetails:
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
 *                 - $ref: '#/components/schemas/project'
 *                 - $ref: '#/components/schemas/default'
 */

/**
 * @openapi
 * /projects:
 *   get:
 *     tags:
 *       - Project
 *     summary: List all Projects
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/projectList'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */

router.get('/', projectListHandler);

/**
 * @openapi
 * /projects:
 *   post:
 *     tags:
 *       - Project
 *     summary: Create new Project
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/projectDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     requestBody:
 *      description: Create a new Project
 *      $ref: '#/components/requestBodies/projectDetails'
 *      required: true
 */
router.post(
  '/',
  isAdmin,
  validateData(ProjectCreateSchema),
  projectCreateHandler,
);

/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Project
 *     summary: Show Project Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/projectDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of Project to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.get('/:id', validateData(IdParamSchema), projectShowHandler);

/**
 * @openapi
 * /projects/{id}:
 *   patch:
 *     tags:
 *       - Project
 *     summary: Edit Project Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/projectDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of Project to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Create a new Project
 *       $ref: '#/components/requestBodies/projectDetails'
 *       required: true
 */
router.patch(
  '/:id',
  isAdmin,
  validateData(ProjectUpdateSchema),
  projectUpdateHandler,
);

/**
 * @openapi
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - Project
 *     summary: Delete Project Details
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/projectDetails'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of Project to delte
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
router.delete(
  '/:id',
  isAdmin,
  validateData(IdParamSchema),
  projectDeleteHandler,
);

export default router;
