import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import httpStatusCode from '../configs/http-status-codes';
import { responseHandler } from '../utils/responseHandler';

export function validateData(
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(
          (issue: any) => `${issue.path.join('.')} is ${issue.message}`,
        );
        responseHandler.failure({
          message: errorMessages,
          statusCode: httpStatusCode.BAD_REQUEST,
          response: res,
        });
      } else {
        responseHandler.failure({
          message: 'Internal Server Error',
          statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
          response: res,
        });
      }
    }
  };
}
