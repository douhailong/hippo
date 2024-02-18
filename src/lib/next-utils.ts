import next from 'next';

export const PORT = Number(process.env.PORT) || 3000;

export const nextServer = next({
  dev: process.env.NODE_ENV !== 'production',
  port: PORT
});

export const nextRequestHandler = nextServer.getRequestHandler();
