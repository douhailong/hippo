'use client';

import React from 'react';
import Link from 'next/link';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sun, Moon, Laptop2, Github, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';

import MaxWidthWraper from './max-width-wraper';

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  const { setTheme } = useTheme();

  return (
    <footer className='border-t border-gray-200 px-6 py-8'>
      <MaxWidthWraper>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-muted-foreground'>
              &copy; {new Date().getFullYear()} Snake, Inc.
            </p>
            <div className='text-sm text-muted-foreground'>
              Made with <span className='text-rose-400'>❤</span> by
            </div>
          </div>
          <ToggleGroup
            type='single'
            size='sm'
            defaultValue='light'
            onValueChange={value => setTheme(value)}
          >
            <ToggleGroupItem value='light'>
              <Sun className='h-5 w-5 text-gray-600' />
            </ToggleGroupItem>
            <ToggleGroupItem value='dark'>
              <Moon className='h-5 w-5 text-gray-600' />
            </ToggleGroupItem>
            <ToggleGroupItem value='device'>
              <Laptop2 className='h-5 w-5 text-gray-600' />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </MaxWidthWraper>

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
