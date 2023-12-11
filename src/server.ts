import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';

import { nextApp, nextHandler } from './next-utils';
import { appRouter } from './trpc';

const PORT = Number(process.env.PORT) || 3000;
const app = express();
const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

async function bootstrap() {
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    app.listen(PORT, async () => {
      console.log(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
}

bootstrap();
