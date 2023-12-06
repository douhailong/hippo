import { router, publicProcedure } from './trpc';
import { auth } from './router/auth';
import { payment } from './router/payment';

export const appRouter = router({
  auth,
  payment
});

export type AppRouter = typeof appRouter;
