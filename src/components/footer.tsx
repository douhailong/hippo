import React from 'react';
import Link from 'next/link';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sun, MoonStar, Laptop2, Github, Twitter } from 'lucide-react';

import MaxWidthWraper from './max-width-wraper';

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className='border-t border-gray-200 px-6 py-8'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} Snake, Inc.
          </p>
          <div className='flex gap-2'>
            <Github className='h-5 w-5 text-gray-500' />
            <Twitter className='h-5 w-5 text-gray-500' />
          </div>
        </div>
        <ToggleGroup type='single' size='sm'>
          <ToggleGroupItem value='light'>
            <Sun className='h-5 w-5 text-gray-600' />
          </ToggleGroupItem>
          <ToggleGroupItem value='dark'>
            <MoonStar className='h-5 w-5 text-gray-600' />
          </ToggleGroupItem>
          <ToggleGroupItem value='device'>
            <Laptop2 className='h-5 w-5 text-gray-600' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {/* <MaxWidthWraper>
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
      </MaxWidthWraper> */}
    </footer>
  );
};

export default Footer;
