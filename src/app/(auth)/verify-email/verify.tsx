'use client';

import React from 'react';
import { Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { trpc } from '@/trpc/client';
import { buttonVariants } from '@/components/ui/button';

type VerifyProps = {
  token: string;
};

const Verify: React.FC<VerifyProps> = ({ token }) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token
  });

  if (data?.success) {
    return (
      <div className='flex flex-col items-center justify-center gap-y-1'>
        <div className='relative h-60 w-60 text-muted-foreground'>
          <Image src='/hippo/email.png' fill alt='the email was sent' />
        </div>
        <h3 className='text-2xl font-semibold'>You&apos;re all set!</h3>
        <p className='text-center text-muted-foreground'>
          Thank you for verifying your email.
        </p>
        <Link className={buttonVariants()} href='/sign-in'>
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-300' />
        <h3 className='text-xl font-semibold'>Verifying...</h3>
        <p className='text-sm text-muted-foreground'>
          This won&apos;t take long.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='text-xl font-semibold'>There was a problem</h3>
        <p className='text-sm text-muted-foreground'>
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }
};

export default Verify;
