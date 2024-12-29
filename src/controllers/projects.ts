import { type Request, type Response } from 'express';
import { z } from 'zod';

import { prisma } from '../configs/db';
import { responseHandler } from '../utils/responseHandler';
import { type ProjectArray } from '../types/projects';
import httpStatusCodes from '../configs/http-status-codes';

/* GET projects listing. */
export async function projectListHandler(_req: Request, res: Response) {
  try {
    const projects = await prisma.project.findMany();
    return responseHandler.success<ProjectArray>({
      message: 'project list fetched successfully',
      data: projects,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch project list failed',
      response: res,
    });
  }
}

/* POST create project. */
export async function projectCreateHandler(req: Request, res: Response) {
  try {
    const project = await prisma.project.create({
      data: { ...req.body },
    });

    return responseHandler.success({
      message: 'project created successfully',
      data: project,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'project create failed',
      response: res,
    });
  }
}
/* GET show project. */
export async function projectShowHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const projectid = z.coerce.number().parse(id);
    const project = await prisma.project.findFirst({
      where: { id: projectid },
    });
    if (!project)
      return responseHandler.failure({
        message: 'project Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });

    return responseHandler.success({
      message: 'project details fetched successfully',
      data: project,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Fetch project details failed',
      response: res,
    });
  }
}

/* PATCH update project. */
export async function projectUpdateHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const projectid = z.coerce.number().parse(id);
    const project = await prisma.project.findFirst({
      where: { id: projectid },
    });
    if (!project)
      return responseHandler.failure({
        message: 'project Not found',
        statusCode: httpStatusCodes.NOT_FOUND,
        response: res,
      });
    const updated_project = await prisma.project.update({
      where: { id: projectid },
      data: {
        ...req.body,
      },
    });
    return responseHandler.success({
      message: 'project updated successfully',
      data: updated_project,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Update project details failed',
      response: res,
    });
  }
}

/* DELETE remove project. */
export async function projectDeleteHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const projectid = z.coerce.number().parse(id);
    const project = await prisma.project.delete({
      where: { id: projectid },
    });
    return responseHandler.success({
      message: 'project deleted successfully',
      data: project,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'Delete project failed',
      response: res,
    });
  }
}

/* POST add user to project. */
export async function addUserProjectHandler(req: Request, res: Response) {
  try {
    const project = await prisma.userProject.create({
      data: { ...req.body },
    });

    return responseHandler.success({
      message: 'user added to project successfully',
      data: project,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'adding user to project failed',
      response: res,
    });
  }
}

/* DELETE remove user from project. */
export async function deleteUserProjectHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userProjectId = z.coerce.number().parse(id);
    const project = await prisma.userProject.delete({
      where: { id: userProjectId },
    });

    return responseHandler.success({
      message: 'user removed from project successfully',
      data: project,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'removing user from project failed',
      response: res,
    });
  }
}
