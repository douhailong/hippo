'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, buttonVariants } from '@/components/ui/button';

type NavigationGroupProps = {};

const paths = [
  { url: '/recommend', name: 'Recommend' },
  { url: '/subscribe', name: 'Subscribe' },
  { url: '/message', name: 'Message' }
];

const NavigationGroup: React.FC<NavigationGroupProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div className='ml-4 flex items-center gap-3'>
      {paths.map(path => (
        <Link
          className={buttonVariants({
            variant: pathname === path.url ? 'secondary' : 'ghost'
          })}
          key={path.url}
          href={path.url}
        >
          {path.name}
        </Link>
      ))}
    </div>
  );
};

export default NavigationGroup;
