import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';

import { validator } from '../../lib/validator';
import { publicProcedure, router } from '../trpc';
import prisma from '../../lib/prisma';
import { jwtHelper } from '../../lib/jwt-helper';

const signUp = publicProcedure
  .input(validator.credentials)
  .mutation(async ({ input }) => {
    const { email, password } = input;
    const from = '1804610117@qq.com';
    const to = 'douhailong666@gmail.com';

    const oldUser = await prisma.user.findUnique({ where: { email } });

    if (oldUser) {
      throw new TRPCError({ code: 'CONFLICT' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomUUID();

    const freshUser = await prisma.user.create({
      data: { email, hashedPassword, verificationToken }
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: from,
        pass: 'ltoijznrfrobdbig'
      }
    });

    await transporter.sendMail({
      from: from,
      to: to,
      subject: 'Verify your accountg',
      html: `<a href=${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${verificationToken}>Verify your account</a>`
    });

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
