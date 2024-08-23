import { z } from 'zod';

export const SprintSchema = z.object({
  name: z.string(),
  status: z.boolean(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
});

export const SprintCreateSchema = z.object({
  body: SprintSchema,
});

export const SprintUpdateSchema = z.object({
  body: SprintSchema.partial(),
  params: z.object({
    id: z.coerce.number(),
  }),
});
