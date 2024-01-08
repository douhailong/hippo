import dotenv from 'dotenv';
import path from 'path';
import type { InitOptions } from 'payload/config';
import payload, { Payload } from 'payload';
import nodemailer from 'nodemailer';

declare global {
  var payload: {
    client: Payload | null;
    promise: Promise<Payload> | null;
  };
}

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const transport = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY
  }
});

const cached = global.payload || {
  client: null,
  promise: null
};

type Args = {
  options?: Partial<InitOptions>;
};

export default async function payloadClient({
  options
}: Args = {}): Promise<Payload> {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transport,
        fromAddress: 'douhailong666@gmail.com',
        fromName: 'hippo'
      },
      secret: process.env.PAYLOAD_SECRET,
      local: options?.express ? false : true,
      ...options
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.client;
}
