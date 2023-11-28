'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { validator, Validator } from '@/lib/validator';

type PageProps = {};

const Page: React.FC<PageProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Validator['credentials']>({
    resolver: zodResolver(validator.credentials)
  });

  const onSubmit = ({ email, password }: Validator['credentials']) => {
    console.log('values', '------');
  };

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
        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.email
                  })}
                  placeholder='Email'
                />
                {errors?.email && (
                  <p className='text-sm text-red-500'>
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  {...register('password')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.password
                  })}
                  placeholder='Password'
                  type='password'
                />
                {errors?.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <Button>Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
