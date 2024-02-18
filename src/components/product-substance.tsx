import React from 'react';
import Link from 'next/link';

import { Skeleton } from './ui/skeleton';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@prisma/client';
import ImageSlider from './image-slider';

type ProductSubstanceProps = { product?: Product; isLoading: boolean };

const Placeholder = () => (
  <div>
    <div className='aspect-square w-full overflow-hidden rounded-xl bg-zinc-100'>
      <Skeleton className='h-full w-full' />
    </div>
    <Skeleton className='mt-4 h-4 w-2/3 rounded-lg' />
    <Skeleton className='mt-2 h-4 w-16 rounded-lg' />
    <Skeleton className='mt-2 h-4 w-12 rounded-lg' />
  </div>
);

const ProductSubstance: React.FC<ProductSubstanceProps> = ({
  product,
  isLoading
}) => {
  return isLoading || !product ? (
    <Link
      href={`/product/${product?.id}`}
      className={cn('invisible h-full w-full cursor-pointer', {
        'visible animate-in fade-in-5': isLoading
      })}
    >
      <div className='flex w-full flex-col'>
        <ImageSlider />
        <h3 className='mt-4 text-sm font-medium text-gray-700'>
          {product?.name}
        </h3>
        <p className='mt-1 text-sm text-gray-500'>{product?.name}</p>
        <p className='mt-1 text-sm font-medium text-gray-900'>
          {formatPrice(product?.price!)}
        </p>
      </div>
    </Link>
  ) : (
    <Placeholder />
  );
};

export default ProductSubstance;
