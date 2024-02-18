'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ZodError } from 'zod';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { validator, Validator } from '@/lib/validator';
import { trpc } from '@/trpc/client';

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Validator['credentials']>({
    resolver: zodResolver(validator.credentials)
  });

  const { mutate, isLoading } = trpc.auth.signUp.useMutation({
    onSuccess({ sentToEmail }) {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push(`/verify-email?to=${sentToEmail}`);
    },
    onError(error) {
      if (error.data?.code === 'CONFLICT') {
        return toast.error('This email is already in use. Sign in instead?');
      }

      if (error instanceof ZodError) {
        return toast.error(error.issues[0].message);
      }

      toast.error('Something went wrong. Please try again.');
    }
  });

  const onSubmit = ({ email, password }: Validator['credentials']) =>
    mutate({ email, password });

  return (
    <div className='mx-auto w-full max-w-[350px] py-8'>
      <div className='flex flex-col items-center space-y-1 text-center'>
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
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
