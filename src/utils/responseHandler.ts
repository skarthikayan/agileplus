import { type ResponseObject } from '../types/utils';
import httpStatusCodes from '../configs/http-status-codes';

export const responseHandler = {
  success: <T>({
    message,
    data,
    statusCode = httpStatusCodes.OK,
    response,
  }: ResponseObject<T>) => {
    response.status(statusCode).json({
      success: true,
      message,
      data,
      statusCode: statusCode,
    });
  },
  failure: <T>({
    message,
    data,
    statusCode = httpStatusCodes.BAD_REQUEST,
    response,
  }: ResponseObject<T>) => {
    response.status(statusCode).json({
      success: false,
      message,
      data,
      statusCode: statusCode,
    });
  },
};
