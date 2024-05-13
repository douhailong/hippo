import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import type { VirtualNoteProps } from './virtual';

type NoteProps = {
  className?: string;
  data: VirtualNoteProps;
  onClick: () => void;
};

const Note: React.FC<NoteProps> = ({
  className,
  data,
  onClick,
  ...restProps
}) => {
  return (
    <div
      className={cn(className, 'h-full w-full bg-red-400')}
      onClick={() => console.log(data, 'data')}
      {...restProps}
    >
      <img className='h-full w-full' src={data.url} />
    </div>
  );
};

export default Note;
