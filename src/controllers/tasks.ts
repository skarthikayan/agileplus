import { type Request, type Response } from 'express';
import { z } from 'zod';

import { prisma } from '../configs/db';
import { responseHandler } from '../utils/responseHandler';
import { type TaskArray } from '../types/tasks';
import httpStatusCodes from '../configs/http-status-codes';

/* GET tasks listing. */
export async function taskListHandler(req: Request, res: Response) {
  try {
    let filter = {};
    if (req.query.backlog_id) {
      const backlog_id = z.coerce.number().parse(req.query?.backlog_id);
      filter = { where: { backlog_id } };
    }
    const tasks = await prisma.task.findMany({
      ...filter,
    });
    return responseHandler.success<TaskArray>({
      message: 'Task list fetched successfully',
      data: tasks,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch task list failed',
      response: res,
    });
  }
}

/* POST create task. */
export async function taskCreateHandler(req: Request, res: Response) {
  try {
    const task = await prisma.task.create({
      data: { ...req.body },
    });

    return responseHandler.success({
      message: 'Task created successfully',
      data: task,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Task create failed',
      response: res,
    });
  }
}
/* GET show task. */
export async function taskShowHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const taskid = z.coerce.number().parse(id);
    const task = await prisma.task.findFirst({ where: { id: taskid } });
    if (!task)
      return responseHandler.failure({
        message: 'Task Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });

    return responseHandler.success({
      message: 'Task details fetched successfully',
      data: task,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch task details failed',
      response: res,
    });
  }
}

/* PATCH update task. */
export async function taskUpdateHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const taskid = z.coerce.number().parse(id);
    const task = await prisma.task.findFirst({ where: { id: taskid } });
    if (!task)
      return responseHandler.failure({
        message: 'Task Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });
    const updated_task = await prisma.task.update({
      where: { id: taskid },
      data: {
        ...req.body,
      },
    });
    return responseHandler.success({
      message: 'Task updated successfully',
      data: updated_task,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Update task details failed',
      response: res,
    });
  }
}

/* DELETE remove task. */
export async function taskDeleteHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const taskid = z.coerce.number().parse(id);
    const task = await prisma.task.delete({
      where: { id: taskid },
    });
    return responseHandler.success({
      message: 'Task deleted successfully',
      data: task,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Delete task failed',
      response: res,
    });
  }
}
