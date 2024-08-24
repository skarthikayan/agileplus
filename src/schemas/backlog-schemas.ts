import { z } from 'zod';

export const BacklogSchema = z.object({
  name: z.string(),
  status: z.enum(['NEW', 'IN_PROGRESS', 'COMPLETED']),
  story_points: z.number(),
  sprint_id: z.number(),
  user_id: z.number(),
});

export const BacklogListSchema = z.object({
  query: z.object({
    sprint_id: z.coerce.number(),
  }),
});

export const BacklogCreateSchema = z.object({
  body: BacklogSchema,
});

export const BacklogUpdateSchema = z.object({
  body: BacklogSchema.partial(),
  params: z.object({
    id: z.coerce.number(),
  }),
});
