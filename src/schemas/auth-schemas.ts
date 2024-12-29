import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const signupSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    empid: z.number(),
    password: z.string(),
    nickname: z.optional(z.string()),
  }),
});
