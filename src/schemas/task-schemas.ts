import { z } from 'zod';

export const TaskSchema = z.object({
  name: z.string(),
  description: z.string(),
  hours: z.number(),
  status: z.enum([
    'NEW',
    'IN_PROGRESS',
    'IN_REVIEW',
    'DEPLOYED_TO_DEV',
    'MERGED_TO_MAIN_BRANCH',
    'DEPLOYED_TO_PROD',
  ]),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  user_id: z.number(),
  backlog_id: z.number(),
});

export const TaskListSchema = z.object({
  query: z.object({
    backlog_id: z.coerce.number(),
  }),
});

export const TaskCreateSchema = z.object({
  body: TaskSchema,
});

export const TaskUpdateSchema = z.object({
  body: TaskSchema.partial(),
  params: z.object({
    id: z.coerce.number(),
  }),
});
