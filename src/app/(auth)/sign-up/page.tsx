import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';

type PageProps = {};

const Page: React.FC<PageProps> = ({}) => {
  return (
    <div className='container flex flex-col items-center justify-center pt-20 lg:px-0'>
      <div className='mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-2'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <Icons.logo className='h-20 w-20' />
          <h1 className='text-2xl font-semibold tracking-tight'>
            Create an account
          </h1>
          <Link
            className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5'
            })}
            href='/sign-in'
          >
            Already have an account? Sign-in
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
        <div>hhhh</div>
      </div>
    </div>
  );
};

export default Page;
