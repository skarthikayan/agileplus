import { z } from 'zod';
import { prisma } from '../configs/db';
import { Response, NextFunction } from 'express';

import { Request, RequestHandler } from '../types/express';
import { responseHandler } from '../utils/responseHandler';
import { validateJWT } from '../utils/jwt';
import httpStatusCodes from '../configs/http-status-codes';

export const protectedRoute: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header('authorization');

  if (!authHeader) {
    return responseHandler.failure({
      message: 'No Auth Header present',
      response: res,
    });
  }

  const accessToken = authHeader.replace(new RegExp('\\b[Bb]earer\\s'), '');

  try {
    const { id } = validateJWT(accessToken);
    const userid = z.coerce.number().parse(id);
    const user = await prisma.user.findFirst({ where: { id: userid } });

    if (user) {
      req.user = user;
      next();
    } else {
      return responseHandler.failure({
        message: 'User not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });
    }
  } catch (err) {
    return responseHandler.failure({
      message: 'Invalid Auth Header',
      response: res,
    });
  }
};
