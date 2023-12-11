import Link from 'next/link';
import React from 'react';

import CartDrawer from '../cart-drawer';
import { Icons } from '../icons';
import MaxWidthWraper from '../max-width-wraper';
import { buttonVariants } from '../ui/button';
import NavGroup from './nav-group';

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const user = null;

  return (
    <header className='sticky inset-x-0 top-0 z-50 bg-transparent backdrop-blur-[6px]'>
      <MaxWidthWraper>
        <div className='flex h-16 items-center border-b border-gray-200'>
          <div className='ml-4 lg:ml-0'>
            <Link href='/'>
              <Icons.logo className='h-10 w-10' />
            </Link>
          </div>

          <div className='hidden lg:ml-8 lg:block lg:self-stretch'>
            <NavGroup />
          </div>

          <div className='ml-auto'>
            <div className='hidden lg:flex lg:items-center lg:justify-end lg:space-x-6'>
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
                ''
              ) : (
                <Link
                  href='/sign-up'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Create account
                </Link>
              )}

              {user && <span className='h-6 w-px bg-gray-200' />}

              {!user && (
                <div className='flex lg:ml-6'>
                  <span className='h-6 w-px bg-gray-200' />
                </div>
              )}

              <div className='ml-4 flow-root lg:ml-6'>
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
