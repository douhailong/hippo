import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import chalk from 'chalk';

import { nextServer, nextRequestHandler, PORT } from './lib/next-utils';
import { appRouter } from './trpc';

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const app = express();
const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

async function bootstrap() {
  console.log('lllllllllllllllll');

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );

  app.use((req, res) => nextRequestHandler(req, res));

  nextServer.prepare().then(() => {
    app.listen(PORT, async () => {
      console.log(
        chalk.magenta(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
      );
    });
  });
}

bootstrap();
