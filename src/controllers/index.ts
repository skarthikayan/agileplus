import { type Request, type Response } from 'express';
import { responseHandler } from '../utils/responseHandler';

/* GET home page. */
export function indexHandler(_req: Request, res: Response) {
  try {
    responseHandler.success({
      message: 'Small steps, Big impact',
      response: res,
    });
  } catch (e) {
    responseHandler.failure({
      message: 'Error',
      response: res,
    });
  }
}
