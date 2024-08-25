import express, { type Router } from 'express';
import { indexHandler } from '../controllers/index';

const router: Router = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   default:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 12345
 *       created_at:
 *         type: string
 *         example: '2024-08-21T19:13:08.440Z'
 *       updated_at:
 *         type: string
 *         example: '2024-08-21T19:13:08.440Z'
 */

/**
 * @openapi
 * components:
 *  responses:
 *   notFound:
 *     description: Not Found
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 404
 *             message:
 *               type: string
 *               example: failed
 *             success:
 *               type: boolean
 *               example: false
 *   internalServerError:
 *     description: Internal server error
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 500
 *             message:
 *               type: string
 *               example: failed
 *             success:
 *               type: boolean
 *               example: false
 */

router.get('/', indexHandler);

export default router;
