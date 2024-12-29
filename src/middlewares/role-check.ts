import { Response, NextFunction } from 'express';

import { Request, RequestHandler } from '../types/express';
import { responseHandler } from '../utils/responseHandler';
import httpStatusCodes from '../configs/http-status-codes';

export const isAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user?.role || user.role !== 'SCRUM_MASTER') {
      return responseHandler.failure({
        message: 'Forbidden',
        statusCode: httpStatusCodes.FORBIDDEN,
        response: res,
      });
    }
    next();
  } catch (err) {
    return responseHandler.failure({
      message: 'Forbidden',
      statusCode: httpStatusCodes.FORBIDDEN,
      data: err,
      response: res,
    });
  }
};
