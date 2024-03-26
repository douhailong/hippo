import { z } from 'zod';
import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';

import { validator } from '../../lib/validator';
import { publicProcedure, router } from '../trpc';
import prisma from '../../lib/prisma';
import { jwtHelper } from '../../lib/jwt-helper';
import { SendTemplate } from '../../components/emails/send-template';
// import { sendEmail } from '../../lib/utils';

const signUp = publicProcedure
  .input(validator.credentials)
  .mutation(async ({ input }) => {
    const { email, password } = input;
    const to = 'douhailong666@gmail.com';

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new TRPCError({ code: 'CONFLICT' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomUUID();

    await prisma.user.create({
      data: { email, hashedPassword, verificationToken }
    });

    // await sendEmail({
    //   to,
    //   verificationToken,
    //   from: 'Hippo@resend.dev',
    //   subject: 'Welcome to Hippo',
    //   actionLabel: 'verify your account',
    //   buttonText: 'Verify Account'
    // });

    return { success: true, sentToEmail: email };
  });

const signIn = publicProcedure
  .input(validator.credentials)
  .mutation(async ({ input, ctx }) => {
    const { res } = ctx;
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email.' });
    }

    if (!user.verified) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email.' });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isCorrectPassword) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid password.'
      });
    }

    const payload = { id: user.id };

    const accessToken = jwtHelper.generateAccessToken(payload, '0.5h');
    const refreshToken = jwtHelper.generateRefreshToken(payload, '7d');

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);

    return user;
  });

const signOut = publicProcedure.mutation(async ({ ctx }) => {
  const { res } = ctx;

  res.clearCookie('access-token');
  res.clearCookie('refresh-token');

  return { success: true };
});

const verifyEmail = publicProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
    const { token } = input;

    const user = await prisma.user.update({
      where: { verificationToken: token },
      data: {
        verificationToken: null,
        verified: true
      }
    });

    if (!user || !user.verified) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return { success: true };
  });

export const auth = router({
  signUp,
  signIn,
  signOut,
  verifyEmail
});
