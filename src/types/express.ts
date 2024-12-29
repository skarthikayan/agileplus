import {
  Request as ExpressRequest,
  RequestHandler as ExpressRequestHandler,
} from 'express';
import type { User } from '@prisma/client';

export interface Request extends ExpressRequest {
  user?: User;
}

export interface RequestHandler extends ExpressRequestHandler {
  user?: User;
}
