'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useMemo,
  useCallback
} from 'react';

import Note from './components/note';
import MaxWidthWraper from '@/components/max-width-wraper';
import { data } from './components/data';
import Virtual from './components/virtual';

type PageProps = {};

const d = [
  { id: '1', width: 500, height: 500 },
  { id: '2', width: 800, height: 342 },
  { id: '3', width: 393, height: 900 },
  { id: '4', width: 636, height: 324 },
  { id: '5', width: 865, height: 535 },
  { id: '6', width: 685, height: 543 },
  { id: '7', width: 579, height: 543 },
  { id: '8', width: 999, height: 343 },
  { id: '9', width: 356, height: 340 },
  { id: '10', width: 156, height: 222 },
  { id: '11', width: 684, height: 334 },
  { id: '12', width: 864, height: 234 },
  { id: '13', width: 456, height: 233 },
  { id: '14', width: 365, height: 423 },
  { id: '15', width: 256, height: 222 },
  { id: '16', width: 453, height: 234 }
];

const Page: React.FC<PageProps> = ({}) => {
  return (
    <div>
      <MaxWidthWraper>
        <Virtual col={3} gap={6} dataSource={d}>
          <Note />
        </Virtual>
      </MaxWidthWraper>
    </div>
  );
};

export default Page;
