import { type Request, type Response } from 'express';
import { z } from 'zod';

import { prisma } from '../configs/db';
import { responseHandler } from '../utils/responseHandler';
import { type SprintArray } from '../types/sprints';
import httpStatusCodes from '../configs/http-status-codes';

/* GET sprints listing. */
export async function sprintListHandler(_req: Request, res: Response) {
  try {
    const sprints = await prisma.sprint.findMany();
    return responseHandler.success<SprintArray>({
      message: 'Sprint list fetched successfully',
      data: sprints,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch sprint list failed',
      response: res,
    });
  }
}

/* POST create sprint. */
export async function sprintCreateHandler(req: Request, res: Response) {
  try {
    const { name, start_date, end_date, status } = req.body;
    const sprint = await prisma.sprint.create({
      data: {
        name,
        status,
        start_date,
        end_date,
      },
    });

    return responseHandler.success({
      message: 'Sprint created successfully',
      data: sprint,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Sprint create failed',
      response: res,
    });
  }
}
/* GET show sprint. */
export async function sprintShowHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const sprintid = z.coerce.number().parse(id);
    const sprint = await prisma.sprint.findFirst({ where: { id: sprintid } });
    if (!sprint)
      return responseHandler.failure({
        message: 'Sprint Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });

    return responseHandler.success({
      message: 'Sprint details fetched successfully',
      data: sprint,
      response: res,
    });
    return;
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch sprint details failed',
      response: res,
    });
  }
}

/* PATCH update sprint. */
export async function sprintUpdateHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const sprintid = z.coerce.number().parse(id);
    const sprint = await prisma.sprint.findFirst({ where: { id: sprintid } });
    if (!sprint)
      return responseHandler.failure({
        message: 'Sprint Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });
    const updated_sprint = await prisma.sprint.update({
      where: { id: sprintid },
      data: {
        ...req.body,
      },
    });
    return responseHandler.success({
      message: 'Sprint updated successfully',
      data: updated_sprint,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Update sprint details failed',
      response: res,
    });
  }
}

/* DELETE remove sprint. */
export async function sprintDeleteHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const sprintid = z.coerce.number().parse(id);
    const sprint = await prisma.sprint.delete({
      where: { id: sprintid },
    });
    return responseHandler.success({
      message: 'Sprint deleted successfully',
      data: sprint,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Delete sprint failed',
      response: res,
    });
  }
}
