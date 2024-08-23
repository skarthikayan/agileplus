import { type Response } from 'express';

export interface ResponseObject<T> {
  message: string | string[];
  data?: T;
  error?: T;
  statusCode?: number;
  response: Response;
}
