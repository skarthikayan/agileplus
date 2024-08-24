import { type Request, type Response } from 'express';
import { z } from 'zod';

import { prisma } from '../configs/db';
import { responseHandler } from '../utils/responseHandler';
import { type UserArray } from '../types/users';
import httpStatusCodes from '../configs/http-status-codes';

/* GET users listing. */
export async function usersListHandler(_req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    return responseHandler.success<UserArray>({
      message: 'User list fetched successfully',
      data: users,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch user list failed',
      response: res,
    });
  }
}

/* POST create user. */
export async function userCreateHandler(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({
      data: {
        ...req.body,
      },
    });

    return responseHandler.success({
      message: 'User created successfully',
      data: user,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'User create failed',
      response: res,
    });
  }
}
/* GET show user. */
export async function userShowHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userid = z.coerce.number().parse(id);
    const user = await prisma.user.findFirst({ where: { id: userid } });
    if (!user)
      return responseHandler.failure({
        message: 'User Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });

    return responseHandler.success({
      message: 'User details fetched successfully',
      data: user,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch user details failed',
      response: res,
    });
  }
}

/* PATCH update user. */
export async function userUpdateHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userid = z.coerce.number().parse(id);
    const user = await prisma.user.findFirst({ where: { id: userid } });
    if (!user)
      return responseHandler.failure({
        message: 'User Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });
    const updated_user = await prisma.user.update({
      where: { id: userid },
      data: {
        ...req.body,
      },
    });
    return responseHandler.success({
      message: 'User updated successfully',
      data: updated_user,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Update user details failed',
      response: res,
    });
  }
}

/* DELETE remove user. */
export async function userDeleteHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userid = z.coerce.number().parse(id);
    const user = await prisma.user.delete({
      where: { id: userid },
    });
    return responseHandler.success({
      message: 'User deleted successfully',
      data: user,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Delete user failed',
      response: res,
    });
  }
}
