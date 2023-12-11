import { initTRPC } from '@trpc/server';

const t = initTRPC.context().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  //   const req = ctx.req;

  console.log(ctx, '???????????????????');

  return next();
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
