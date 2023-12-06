import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { AppRouter, appRouter } from '../';
import { publicProcedure, router } from '../trpc';
import payloadClient from '../../payload-client';
import { validator } from '../../lib/validator';

const signUp = publicProcedure
  .input(validator.credentials)
  .mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const payload = await payloadClient();
    const { docs: users } = await payload.find({
      collection: 'users',
      where: { email: { equals: email } }
    });
    if (users.length !== 0) {
      throw new TRPCError({ code: 'CONFLICT' });
    }
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'user'
      }
    });
    return { success: true, sentToEmail: email };
  });

const signIn = publicProcedure
  .input(validator.credentials)
  .mutation(async ({ input }) => {
    const { email, password } = input;
    const payload = await payloadClient();
    const { docs: users } = await payload.find({
      collection: 'users',
      where: { email: { equals: email } }
    });
    if (users.length !== 0) {
      throw new TRPCError({ code: 'CONFLICT' });
    }
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'user'
      }
    });
    return { success: true, sentToEmail: email };
  });

const verifyEmail = publicProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
    const { token } = input;

    const payload = await payloadClient();
    const isVerified = await payload.verifyEmail({
      collection: 'users',
      token
    });

    if (!isVerified) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return { success: true };
  });

export const auth = router({
  signUp,
  signIn,
  verifyEmail
});
