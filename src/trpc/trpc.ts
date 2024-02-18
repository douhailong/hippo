import { TRPCError, initTRPC } from '@trpc/server';

import type { ExpressContext } from '@/server';

const t = initTRPC.context<ExpressContext>().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  const { req } = ctx;
  const { user } = req as any;

  if (!user || !user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx: { user } });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
