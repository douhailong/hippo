import React from 'react';

import Note from './components/note';
import MaxWidthWraper from '@/components/max-width-wraper';
import { data } from './components/data';
import Virtual from './components/virtual';

type PageProps = {};

const Page: React.FC<PageProps> = ({}) => {
  const dataSource = data.data.items.map(i => ({
    id: i.id,
    width: i.note_card.cover.width,
    height: i.note_card.cover.height,
    url: i.note_card.cover.url
  }));

  console.log('ppppppppp');

  return (
    <div>
      <MaxWidthWraper>
        <Virtual col={4} gap={12} dataSource={dataSource}>
          <Note />
        </Virtual>
      </MaxWidthWraper>
    </div>
  );
};

export default Page;
