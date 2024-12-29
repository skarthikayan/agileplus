import express, { type Router } from 'express';
import { validateData } from '../middlewares/schema-validation';
import { loginHandler, signupHandler } from '../controllers/auth';
import { loginSchema, signupSchema } from '../schemas/auth-schemas';

const router: Router = express.Router();

/**
 * @openapi
 * components:
 *  requestBodies:
 *    signup:
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *             - $ref: '#/components/schemas/user'
 *             - type: object
 *               properties:
 *                 password:
 *                   type: string
 *                   example: samplepassword
 *    login:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: skarthikayan7@gmail.com
 *              password:
 *                type: string
 *                example: password
 *
 */

/**
 * @openapi
 * components:
 *  responses:
 *   login:
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
 *               properties:
 *                 token:
 *                   type: string
 *                   example: abcdefghijklmnopqrstuvwxyz
 *   signup:
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
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/login'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     requestBody:
 *       description: login
 *       $ref: '#/components/requestBodies/login'
 *       required: true
 */
router.post('/login', validateData(loginSchema), loginHandler);

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signup
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/signup'
 *       '404':
 *         $ref: '#/components/responses/notFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 *     requestBody:
 *       description: login
 *       $ref: '#/components/requestBodies/signup'
 *       required: true
 */
router.post('/signup', validateData(signupSchema), signupHandler);

export default router;
