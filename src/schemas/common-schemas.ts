import { z } from 'zod';

export const IdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
