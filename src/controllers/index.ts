import { Router, Request, Response } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  try {
    res.send('knock knock');
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
