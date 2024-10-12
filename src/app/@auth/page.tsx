import Link from 'next/link';
import React from 'react';

type PageProps = {};

const Page: React.FC<PageProps> = ({}) => {
  return (
    <div>
      <Link href='/sign-ins'>to</Link>
    </div>
  );
};

export default Page;
