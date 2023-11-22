import React from 'react';
import MaxWidthWraper from '../max-width-wraper';
import Link from 'next/link';
import { Icons } from '../icons';
import NavItems from './nav-items';
import { buttonVariants } from '../ui/button';
import CartDrawer from '../cart-drawer';

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const user = null;

  return (
    <header className='sticky backdrop-blur-[6px] bg-transparent inset-x-0 top-0 z-50'>
      <MaxWidthWraper>
        <div className='border-b h-16 flex items-center border-gray-200'>
          <div className='ml-4 lg:ml-0'>
            <Link href='/'>
              <Icons.logo className='w-10 h-10' />
            </Link>
          </div>

          <div className='hidden lg:block lg:ml-8 lg:self-stretch'>
            <NavItems />
          </div>

          <div className='ml-auto flex items-center'>
            <div className='hidden lg:flex lg:items-center lg:justify-end lg:space-x-6'>
              {!user && (
                <Link
                  href='/sign-in'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Sign in
                </Link>
              )}

              {!user && (
                <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
              )}

              {user ? (
                ''
              ) : (
                <Link
                  href='/sign-up'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Create account
                </Link>
              )}

              {user && (
                <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
              )}

              {!user && (
                <div className='flex lg:ml-6'>
                  <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                </div>
              )}

              <div className='ml-4 lg:ml-6 flow-root'>
                <CartDrawer />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWraper>
    </header>
  );
};

export default NavBar;
