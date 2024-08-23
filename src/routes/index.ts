import express, { type Router } from 'express';
import { indexHandler } from '../controllers/index';

const router: Router = express.Router();

router.get('/', indexHandler);

export default router;
