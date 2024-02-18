import React from 'react';

import { cn } from '@/lib/utils';

type MaxWidthWraperProps = {
  className?: string;
  children: React.ReactNode;
};

const MaxWidthWraper: React.FC<MaxWidthWraperProps> = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWraper;
