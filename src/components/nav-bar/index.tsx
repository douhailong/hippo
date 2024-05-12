import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Command, Search, AlignRight, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import CartDrawer from '../cart-drawer';
import { Icons } from '../icons';
import MaxWidthWraper from '../max-width-wraper';
import { Button, buttonVariants } from '../ui/button';
import NavGroup from './tools/nav-group';
import ProfileDropdown from './tools/profile-dropdown';
import { getUser } from '@/lib/get-user';
import MobileNav from './tools/mobile-nav';
import ThemeDropdown from './tools/theme-dropdown';
import NavigationGroup from './components/navigation-group';

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = async () => {
  const cookieStore = cookies();

  const user = await getUser(cookieStore);

  const valid = true;

  return (
    <header className='sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-transparent backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-screen-2xl items-center px-8'>
        <Link href='/'>
          <Icons.logo className='h-6 w-6' />
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
        </nav>

        <nav className='ml-auto flex items-center gap-3 lg:hidden'>
          <Search className='h-5 w-5 cursor-pointer' />
          <AlignRight className='h-5 w-5 cursor-pointer' />
        </nav>

        <nav className='ml-auto flex items-center gap-4 max-lg:hidden'>
          <button className='flex h-8 w-60 items-center justify-between whitespace-nowrap rounded-md bg-zinc-100 px-2 text-sm text-gray-400'>
            Type keywords...
            <div className='ml-4 flex h-5 items-center rounded-md bg-white px-1.5 text-xs font-medium leading-5 text-gray-950 ring-1 ring-inset ring-gray-200'>
              <Command className='h-3 w-3' />
              <span>K</span>
            </div>
          </button>

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
              className={buttonVariants({ variant: 'default', size: 'sm' })}
            >
              Get Started
            </Link>
          )}
        </nav>

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
      </div>
    </header>
  );
};

export default NavBar;
