import { responseHandler } from '../utils/responseHandler';
import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../configs/db';

import { z } from 'zod';
import { generateAccessToken } from '../utils/jwt';

/* POST login */
export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const userEmail = z.string().email().parse(email);
    const user = await prisma.user.findFirst({
      where: { email: userEmail },
      select: { id: true, password: true },
    });
    if (!user) throw 'Incorret email';
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return responseHandler.failure({
        message: 'Incorret password',
        response: res,
      });
    }
    const payload = {
      id: user.id,
    };
    const token = generateAccessToken(payload);
    return responseHandler.success({
      message: 'User login successful',
      data: token,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'login failed',
      data: e,
      response: res,
    });
  }
}

/* POST signup */
export async function signupHandler(req: Request, res: Response) {
  try {
    const { email, name, empid, nickname, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        empid,
        nickname: nickname || '',
        password: passwordHash,
      },
    });
    return responseHandler.success({
      message: 'User created successfully',
      data: user,
      response: res,
    });
  } catch (e) {
    return responseHandler.failure({
      message: 'User signup failed',
      response: res,
    });
  }
}
