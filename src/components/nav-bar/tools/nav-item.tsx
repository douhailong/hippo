import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CategoryType } from '@/config';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';

type NavItemProps = {
  onTrigger?: () => void;
  open?: boolean;
  category?: CategoryType;
};

const NavItem: React.FC<NavItemProps> = ({ open, category, onTrigger }) => {
  return (
    <div className='flex'>
      <div className='flex items-center'>
        <Button
          className='gap-1.5'
          variant={open ? 'secondary' : 'ghost'}
          onClick={onTrigger}
        >
          {category?.label}
          <ChevronDown
            className={cn('h-4 w-4 text-muted-foreground transition-all', {
              '-rotate-180': open
            })}
          />
        </Button>
      </div>
      {open && (
        <div
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            { 'animate-in fade-in-10 slide-in-from-top-5': !open }
          )}
        >
          <div className='absolute inset-0 top-1/2 bg-white shadow' />
          <div className='relative mx-auto max-w-7xl bg-white px-8'>
            <div className='grid grid-cols-3 gap-x-8 gap-y-10 py-16'>
              {/* <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-8'> */}
              {category?.featured.map(item => (
                <div key={item.name} className='group text-base sm:text-sm'>
                  <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-70'>
                    <Image
                      fill
                      src={item.imageSrc}
                      alt='product image'
                      className='object-cover object-center transition-all'
                    />
                  </div>
                  <Link
                    href={item.href}
                    className='mt-6 block font-medium text-gray-900'
                  >
                    {item.name}
                  </Link>
                  <p className='mt-1'>Shop now</p>
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
