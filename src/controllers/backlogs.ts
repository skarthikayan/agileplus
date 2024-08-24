import { type Request, type Response } from 'express';
import { z } from 'zod';

import { prisma } from '../configs/db';
import { responseHandler } from '../utils/responseHandler';
import { type BacklogArray } from '../types/backlogs';
import httpStatusCodes from '../configs/http-status-codes';

/* GET backlogs listing. */
export async function backlogListHandler(req: Request, res: Response) {
  try {
    let filter = {};
    if (req.query.sprint_id) {
      const sprint_id = z.coerce.number().parse(req.query?.sprint_id);
      filter = { where: { sprint_id } };
    }
    const backlogs = await prisma.backlog.findMany({
      ...filter,
    });
    return responseHandler.success<BacklogArray>({
      message: 'Backlog list fetched successfully',
      data: backlogs,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch backlog list failed',
      response: res,
    });
  }
}

/* POST create backlog. */
export async function backlogCreateHandler(req: Request, res: Response) {
  try {
    const backlog = await prisma.backlog.create({
      data: {
        ...req.body,
      },
    });

    return responseHandler.success({
      message: 'Backlog created successfully',
      data: backlog,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Backlog create failed',
      response: res,
    });
  }
}
/* GET show backlog. */
export async function backlogShowHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const backlogid = z.coerce.number().parse(id);
    const backlog = await prisma.backlog.findFirst({
      where: { id: backlogid },
    });
    if (!backlog)
      return responseHandler.failure({
        message: 'Backlog Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });

    return responseHandler.success({
      message: 'Backlog details fetched successfully',
      data: backlog,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch backlog details failed',
      response: res,
    });
  }
}

/* PATCH update backlog. */
export async function backlogUpdateHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const backlogid = z.coerce.number().parse(id);
    const backlog = await prisma.backlog.findFirst({
      where: { id: backlogid },
    });
    if (!backlog)
      return responseHandler.failure({
        message: 'Backlog Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });
    const updated_backlog = await prisma.backlog.update({
      where: { id: backlogid },
      data: {
        ...req.body,
      },
    });
    return responseHandler.success({
      message: 'Backlog updated successfully',
      data: updated_backlog,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Update backlog details failed',
      response: res,
    });
  }
}

/* DELETE remove backlog. */
export async function backlogDeleteHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const backlogid = z.coerce.number().parse(id);
    const backlog = await prisma.backlog.delete({
      where: { id: backlogid },
    });
    return responseHandler.success({
      message: 'Backlog deleted successfully',
      data: backlog,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Delete backlog failed',
      response: res,
    });
  }
}
