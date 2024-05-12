import React from 'react';

type PageProps = {
  params: {
    productId: string;
  };
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { productId } = params;

  return <div>Page</div>;
};

export default Page;
