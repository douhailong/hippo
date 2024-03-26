import { cookies } from 'next/headers';
import prisma from '../lib/prisma';
import { jwtHelper } from './jwt-helper';
import { NextRequest } from 'next/server';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function getUser(
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) {
  const token = cookies.get('access-token')?.value;

  if (!token) return null;

  try {
    const payload = jwtHelper.verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });


    return user;
  } catch (err) {
    return null;
  }
}
