import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpToLine } from 'lucide-react';

import MaxWidthWraper from '@/components/max-width-wraper';

type PageProps = {};

const Page: React.FC<PageProps> = ({}) => {
  return (
    <MaxWidthWraper>
      <ArrowUpToLine className='fixed bottom-32 right-12 text-gray-600 hover:cursor-pointer' />
      <div className='h-full'>
        <Virtual<{ a: number }> reserveSize={32} dataSource={[{ a: 22 }]} />
      </div>
    </MaxWidthWraper>
  );
};

export default Page;

type VirtualProps<T> = {
  dataSource: T[];
  reserveSize: number;
};

type PositionType = {
  currentIndex: number;
  top: number;
  bottom: number;
  height: number;
};

function Virtual<T>({ dataSource, reserveSize }: VirtualProps<T>) {
  // const containerDom = useRef<HTMLDivElement>();
  // const listDom = useRef<HTMLDivElement>();

  // const domSize = useRef({ container: 0, list: 0 });
  // const positions = useRef<PositionType[]>([]);

  // const [startIndex, setStartIndex] = useState(0);
  // const [max, setMax] = useState(0);

  // const endIndex = Math.min(dataSource.length, startIndex + max);

  // const renderData = dataSource.slice(startIndex, endIndex);

  // useEffect(() => {
  //   const containerDomHeight = containerDom.current?.offsetHeight ?? 0;

  //   setMax(Math.ceil(containerDomHeight / reserveSize) + 1);
  // }, []);

  return (
    <div className='mx-auto h-96 w-60 overflow-y-auto bg-slate-400'>
      <div className=''></div>
    </div>
  );
}
