'use client';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';

type CartDrawerProps = {};

const CartDrawer: React.FC<CartDrawerProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger className='group flex items-center -m-2 p-2'>
        <ShoppingCart className='w-6 h-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
        <span className='ml-2 text-sm font-medium text-gray-500 group-hover:text-gray-800'>
          0
        </span>
      </SheetTrigger>
      <SheetContent className='w-full flex flex-col sm:max-w-lg pr-0'>
        <SheetTitle className='spcae-y-2.5 pr-6'>Cart (0)</SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
