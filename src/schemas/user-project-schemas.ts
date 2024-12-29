import { z } from 'zod';

export const UserProjectSchema = z.object({
  user_id: z.number(),
  project_id: z.number(),
});

export const UserProjectCreateSchema = z.object({
  body: UserProjectSchema,
});
