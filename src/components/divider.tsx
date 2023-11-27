import React from 'react';

import { cn } from '@/lib/utils';

type DividerProps = {
  direction?: 'vertical' | 'horizontal';
  className?: string;
  color?: string;
};

const Divider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  className,
  color
}) => {
  return (
    <div
      className={cn('bg-gray-200', {
        'h-px w-full': direction === 'horizontal',
        'h-full w-px': direction === 'vertical',
        color
      })}
    />
  );
};

export default Divider;
