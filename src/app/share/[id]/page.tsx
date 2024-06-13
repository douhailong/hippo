import MaxWidthWraper from '@/components/max-width-wraper';
import React from 'react';

type PageProps = {
  params: {
    id: string;
  };
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className='min-h-full'>
      <MaxWidthWraper className='h-full'>8</MaxWidthWraper>
    </div>
  );
};

export default Page;
