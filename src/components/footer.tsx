import React from 'react';
import Link from 'next/link';

import MaxWidthWraper from './max-width-wraper';

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className='border-t border-gray-200'>
      <MaxWidthWraper>
        <div className='py-10 md:flex md:items-center md:justify-between'>
          <div className='max-md:text-center'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          <div className='flex items-center justify-center space-x-8 max-md:mt-4'>
            <Link
              href='#'
              className='text-sm text-muted-foreground hover:text-gray-600'
            >
              Terms
            </Link>
            <Link
              href='#'
              className='text-sm text-muted-foreground hover:text-gray-600'
            >
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-sm text-muted-foreground hover:text-gray-600'
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </MaxWidthWraper>
    </footer>
  );
};

export default Footer;
