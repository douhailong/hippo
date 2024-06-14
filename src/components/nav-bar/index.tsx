import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { AlignLeft, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import CommandButton from './components/command-button';
import { Icons } from '../icons';
import { buttonVariants } from '../ui/button';
import { getUser } from '@/lib/get-user';
import { cn } from '@/lib/utils';

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = async () => {
  const cookieStore = cookies();

  const user = await getUser(cookieStore);

  const valid = false;

  return (
    <header className='sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-transparent backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-screen-2xl items-center px-4 transition-all md:px-8'>
        <AlignLeft className='mr-4 h-6 w-6 cursor-pointer md:mr-6 lg:hidden' />
        <Link href='/'>
          <Icons.logo className='h-7 w-7' />
        </Link>
        <nav className='ml-4 flex items-center gap-2 max-lg:hidden'>
          <Link
            href='/share'
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            Share
          </Link>
          <Link
            href='/popular'
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            Popular
          </Link>
          <Link
            href='/subscribe'
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            Subscribe
          </Link>
          <Link
            href='/share'
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            Share
          </Link>
        </nav>

        <nav className='ml-auto flex items-center gap-4'>
          <CommandButton />

          <Separator orientation='vertical' className='h-4' />

          {valid && (
            <div className='relative'>
              <Bell className='h-5 w-5 cursor-pointer text-gray-800 transition-all hover:scale-105' />
              <p className='absolute -right-0.5 -top-0.5 h-1 w-1 animate-pulse rounded-full bg-red-600' />
            </div>
          )}

          {valid && <Separator orientation='vertical' className='h-4' />}

          {valid && (
            <Link href='/user'>
              <Avatar className='h-8 w-8 cursor-pointer transition-all hover:scale-105'>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          )}

          {!valid && (
            <Link
              href='/sign-in'
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              Sign in
            </Link>
          )}

          {!valid && (
            <Link
              href='/sign-up'
              className={cn(
                'max-lg:hidden',
                buttonVariants({ variant: 'default', size: 'sm' })
              )}
            >
              Get Started
            </Link>
          )}
        </nav>
      </div>
      {/* <MobileNav /> */}
      {/* <div className='max-lg:hidden lg:ml-8 lg:self-stretch'>
            <NavGroup />
          </div> */}

      {/* <div className='ml-auto hidden lg:flex lg:items-center lg:justify-end lg:space-x-6'>
            {!user && (
              <Link
                href='/sign-in'
                className={buttonVariants({ variant: 'ghost' })}
              >
                Sign in
              </Link>
            )}

            {!user && <span className='h-6 w-px bg-gray-200' />}

            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <Link
                href='/sign-up'
                className={buttonVariants({ variant: 'ghost' })}
              >
                Get Started
              </Link>
            )}
            <ThemeDropdown />

            {user && <span className='h-6 w-px bg-gray-200' />}

            {!user && (
              <div className='flex lg:ml-6'>
                <span className='h-6 w-px bg-gray-200' />
              </div>
            )}

            <div className='ml-4 flow-root lg:ml-6'>
              <CartDrawer />
            </div>
          </div> */}
    </header>
  );
};

export default NavBar;
