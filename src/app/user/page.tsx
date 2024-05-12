import React from 'react';

import MaxWidthWraper from '@/components/max-width-wraper';

type PageProps = {};

const Page: React.FC<PageProps> = ({}) => {
  return (
    <div>
      <MaxWidthWraper>
        <div className='relative flex items-start gap-4'>
          <div className='h-[1000px] flex-[2] bg-slate-300'>1</div>
          <div className='sticky left-0 right-0 top-0 flex-1 bg-red-300 max-md:hidden'>
            2
          </div>
        </div>
      </MaxWidthWraper>
    </div>
  );
};

export default Page;
