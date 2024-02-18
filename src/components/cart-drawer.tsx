'use client';

import { Separator } from '@radix-ui/react-separator';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { formatPrice } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet';

type CartDrawerProps = {};

const CartDrawer: React.FC<CartDrawerProps> = ({}) => {
  const count = 0;
  const fee = 9;

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
        <span className='ml-2 text-sm font-medium text-gray-500 group-hover:text-gray-800'>
          0
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Cart (0)</SheetTitle>
        </SheetHeader>
        {count > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>cart items</div>
            <div className='space-y-4 pr-6'>
              <Separator className='h-px w-full bg-gray-200' />
              <div className='space-y-1.5 text-sm'>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  <span>{formatPrice(2)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({ className: 'w-full' })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='spcae-y-1 flex h-full flex-col items-center justify-center'>
            <div className='relative mb-4 h-60 w-60'>
              <Image
                className='transition-transform hover:scale-110'
                src='/hippo/empty.png'
                alt='empty'
                fill
              />
            </div>
            <div className='text-xl font-semibold tracking-tight'>
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm tracking-tight text-muted-foreground'
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
