import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './lib/get-user';

export async function middleware({ nextUrl, cookies, url }: NextRequest) {
  // const user = await getUser(cookies);

  // if (user && ['/sign-in', '/sign-up'].includes(nextUrl.pathname)) {
  // }

  // NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`);
  return NextResponse.next();
}
