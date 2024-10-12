import React, { useEffect, useState } from 'react';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Command,
  Search
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

const Page = () => {
  return (
    <main>
      <Dialog open>
        <DialogContent className='w-full sm:w-96'>
          <DialogHeader>
            <DialogTitle>Create your account</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col space-y-2'>
            <Link className={buttonVariants({ variant: 'secondary' })} href='/'>
              <Icons.google className='mr-2 h-4 w-4' /> Continue with Github
            </Link>
            <Link className={buttonVariants({ variant: 'secondary' })} href='/'>
              <Icons.google className='mr-2 h-4 w-4' /> Continue with Google
            </Link>
          </div>

          <div className='relative my-1'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                OR
              </span>
            </div>
          </div>

          <form className='flex flex-col space-y-6'>
            <div className='relative grid gap-1'>
              <Label htmlFor='email'>Email</Label>
              <Input
                // className={cn({
                //   'focus-visible:ring-red-500': errors.email
                // })}
                placeholder='Email'
              />
              {/* {errors?.email && (
                  <p className='absolute -bottom-[22px] text-sm text-red-500'>
                    {errors.email.message as string}
                  </p>
                )} */}
            </div>
            <div className='relative grid gap-1'>
              <Label htmlFor='password'>Password</Label>
              <Input
                // {...register('password')}
                // className={cn({
                //   'focus-visible:ring-red-500': errors.password
                // })}
                placeholder='Password'
                type='password'
              />
              {/* {errors?.password && (
                  <p className='absolute -bottom-[22px] text-sm text-red-500'>
                    {errors.password.message as string}
                  </p>
                )} */}
            </div>
            <Button className='w-full' disabled={false}>
              {/* {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} */}
              Sign up
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Page;
