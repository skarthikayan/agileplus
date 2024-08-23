import express, { type Request, type Response, type Router } from 'express';
import { indexHandler } from '../controllers/index';

const router: Router = express.Router();

router.get('/', indexHandler);

export default router;
