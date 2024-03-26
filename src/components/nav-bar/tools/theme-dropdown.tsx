'use client';

import React, { useState } from 'react';
import { Sun, MoonStar, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '../../ui/dropdown-menu';

type ThemeDropdownProps = {};

type Themes = 'light' | 'dark' | 'system';

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({}) => {
  const [activeTheme, setActiveTheme] = useState<Themes>('light');

  const onChangeTheme = (theme: Themes) => {
    setActiveTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button variant='ghost' size='sm'>
          <Laptop className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-20 bg-white' align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <div
              className='flex space-x-2.5'
              onClick={() => onChangeTheme('light')}
            >
              <Sun className='h-5 w-5 text-gray-400 group-hover:text-gray-500' />
              <span className='font-bold text-gray-700'>Light</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <div
              className='flex space-x-2.5'
              onClick={() => onChangeTheme('dark')}
            >
              <MoonStar className='h-5 w-5 text-gray-400 group-hover:text-gray-500' />
              <span className='font-bold text-gray-700'>Dark</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <div
              className='flex space-x-2.5'
              onClick={() => onChangeTheme('system')}
            >
              <Laptop className='h-5 w-5 text-gray-400 group-hover:text-gray-500' />
              <span className='font-bold text-gray-700'>System</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeDropdown;
