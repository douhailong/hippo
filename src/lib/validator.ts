import { z } from 'zod';

export const validator = {
  credentials: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(12)
  }),
  query: z.object({
    category: z.string().optional(),
    sort: z.enum(['asc', 'desc']).optional(),
    limit: z.number().optional()
  })
} as const;

export type Validator = {
  credentials: z.infer<typeof validator.credentials>;
  query: z.infer<typeof validator.query>;
};
