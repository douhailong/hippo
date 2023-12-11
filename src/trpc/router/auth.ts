import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import { validator } from '../../lib/validator';
import { publicProcedure, router } from '../trpc';
import prisma from '../../lib/prisma';

const signUp = publicProcedure
  .input(validator.credentials)
  .mutation(async ({ input }) => {
    const { email, password } = input;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({ data: { email, hashedPassword } });

    console.log(user, 'uuuuu____________________uuuuuuuuuuu');

    return user;
  });

const signIn = publicProcedure
  .input(validator.credentials)
  .mutation(async ({ input }) => {
    const { email, password } = input;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.hashedPassword) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid data' });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isCorrectPassword) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Password error' });
    }

    return user;
  });

const verifyEmail = publicProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
    const { token } = input;
  });

export const auth = router({
  signUp,
  signIn,
  verifyEmail
});
