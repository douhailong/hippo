import express from 'express';

import payloadClient from './payload-client';
import { nextApp, nextHandler } from './next-utils';

const PORT = Number(process.env.PORT) || 3000;
const app = express();

async function bootstrap() {
  const payload = await payloadClient({
    options: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      }
    }
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    // payload.logger.info('Next.js started');
    app.listen(PORT, async () => {
      // payload.logger.info(
      //   `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      // );
    });
  });
}

bootstrap();
