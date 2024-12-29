import { z } from 'zod';

export const ProjectSchema = z.object({
  name: z.string(),
  status: z.boolean(),
});

export const ProjectCreateSchema = z.object({
  body: ProjectSchema,
});

export const ProjectUpdateSchema = z.object({
  body: ProjectSchema.partial(),
  params: z.object({
    id: z.coerce.number(),
  }),
});
