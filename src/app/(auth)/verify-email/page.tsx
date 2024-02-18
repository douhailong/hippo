import React from 'react';
import Image from 'next/image';

import Verify from './verify';

type VerifyEmialProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const VerifyEmial: React.FC<VerifyEmialProps> = ({ searchParams }) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className='container flex flex-col items-center justify-center pt-20 lg:px-0'>
      {token && typeof token === 'string' ? (
        <Verify token={token} />
      ) : (
        <div className='flex flex-col items-center justify-center space-y-2'>
          <div className='relative h-60 w-60 text-muted-foreground'>
            <Image src='/hippo/email.png' fill alt='email' />
          </div>
          <h3 className='text-2xl font-semibold'>Check your email</h3>
          {toEmail ? (
            <p className='text-center text-muted-foreground'>
              We&apos;ve sent a verification link to
              <span className='font-semibold'>{' ' + toEmail}</span>.
            </p>
          ) : (
            <p className='text-center text-muted-foreground'>
              We&apos;ve sent a verification link to your email.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmial;
