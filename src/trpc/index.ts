import { router, publicProcedure } from './trpc';
import { auth } from './router/auth';
import { payment } from './router/payment';
import { product } from './router/product';

export const appRouter = router({
  auth,
  payment,
  product
});

export type AppRouter = typeof appRouter;
