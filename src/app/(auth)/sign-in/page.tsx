'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ZodError } from 'zod';

import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { type Validator, validator } from '@/lib/validator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';

type SignInProps = {};

const SignIn: React.FC<SignInProps> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Validator['credentials']>({
    resolver: zodResolver(validator.credentials)
  });

  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const { mutate, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess() {
      toast.success('Signed in successfully');
      router.refresh();

      function push(url: string) {
        router.push(url);
        router.refresh();
      }

      switch (true) {
        case !!origin:
          return push(`/${origin}`);
        case isSeller:
          return push('/sell');
        default:
          push('/');
      }
    },
    onError(err) {
      err.data?.code === 'UNAUTHORIZED' && toast.error(err.data.code);
    }
  });

  const onSubmit = ({ email, password }: Validator['credentials']) => {
    mutate({ email, password });
  };

  const onContinue = () => {
    isSeller ? router.replace('/sign-in') : router.push('?as=seller');
  };

  return (
    <div className='mx-auto w-full max-w-[350px] py-8'>
      <div className='flex flex-col items-center space-y-1 text-center'>
        <Icons.logo className='h-20 w-20' />
        <h1 className='text-2xl font-semibold tracking-tight'>
          Sign in to your {isSeller && 'seller'} account
        </h1>
        <Link
          className={buttonVariants({
            variant: 'link',
            className: 'gap-1.5'
          })}
          href='/sign-up'
        >
          Don&apos;t have an account?
          <ArrowRight className='h-4 w-4' />
        </Link>
      </div>
      <div className='grid gap-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-6'>
            <div className='relative grid gap-1'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register('email')}
                className={cn({
                  'focus-visible:ring-red-500': errors.email
                })}
                placeholder='Email'
              />
              {errors?.email && (
                <p className='absolute -bottom-[22px] text-sm text-red-500'>
                  {errors.email.message as string}
                </p>
              )}
            </div>
            <div className='relative grid gap-1'>
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
                <p className='absolute -bottom-[22px] text-sm text-red-500'>
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Sign in
            </Button>
          </div>
        </form>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>or</span>
          </div>
        </div>
        <Button onClick={onContinue} variant='secondary' disabled={isLoading}>
          Continue as {isSeller ? 'seller' : 'customer'}
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
