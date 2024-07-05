'use client';

import React from 'react';
import Link from 'next/link';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sun, Moon, Laptop2, Github, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';

import MaxWidthWraper from './max-width-wraper';
import { Separator } from '@/components/ui/separator';

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  const { setTheme } = useTheme();

  return (
    <footer className='border-t border-gray-200 py-8'>
      <MaxWidthWraper>
        <div className='flex items-center justify-between'>
          <p className='text-xs text-muted-foreground'>
            Made with <span className='text-rose-400'>❤</span> by
          </p>
          <ToggleGroup
            type='single'
            size='sm'
            defaultValue='light'
            onValueChange={value => setTheme(value)}
          >
            <ToggleGroupItem value='light'>
              <Sun className='h-4 w-4 text-gray-600' />
            </ToggleGroupItem>
            <ToggleGroupItem value='dark'>
              <Moon className='h-4 w-4 text-gray-600' />
            </ToggleGroupItem>
            <ToggleGroupItem value='device'>
              <Laptop2 className='h-4 w-4 text-gray-600' />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {/* <div className='my-2 border-b border-gray-200' /> */}
        <div className='flex gap-6 text-xs'>
          <p className='text-muted-foreground'>
            版权所有 &copy; {new Date().getFullYear()} Beta, Inc.
          </p>
          <div className='flex gap-2 text-muted-foreground'>
            <Link href='/'>使用条款</Link>
            <Separator orientation='vertical' className='h-4' />
            <Link href='/'>隐私政策</Link>
            <Separator orientation='vertical' className='h-4' />
            <Link href='/'>协议和准则</Link>
          </div>
        </div>
      </MaxWidthWraper>
    </footer>
  );
};

export default Footer;
