import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  empid: z.number(),
  nickname: z.string(),
  status: z.boolean(),
  role: z.enum(['USER', 'SCRUM_MASTER']),
});

export const UserCreateSchema = z.object({
  body: UserSchema,
});

export const UserUpdateSchema = z.object({
  body: UserSchema.partial(),
  params: z.object({
    id: z.coerce.number(),
  }),
});
