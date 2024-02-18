'use client';

import { trpc } from '@/trpc/client';
import Link from 'next/link';
import React from 'react';
import ProductSubstance from './product-substance';

type ProductReelProps = { title?: string; subtitle?: string; href?: string };

const ProductReel: React.FC<ProductReelProps> = ({ title, subtitle, href }) => {
  const { data, isLoading } = trpc.product.getProducts.useInfiniteQuery(
    {
      limit: 1,
      query: {}
    }
    // { getNextPageParam: lastPage => lastPage.nextPage }
  );

  // const products = data?.pages.flatMap(page => page.items);

  return (
    <section className='py-12'>
      <div className='mb-4 md:flex md:items-center md:justify-between'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title && (
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'
          >
            Shop the collection
            <span> &rarr;</span>
          </Link>
        )}
      </div>
      <div className='relative grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <ProductSubstance
            key={i}
            isLoading={true}
            product={{ name: `name-${i}`, id: 'msmsm' + i, price: 122 }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductReel;
