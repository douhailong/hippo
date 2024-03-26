'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type MobileNavProps = {};

const MobileNav: React.FC<MobileNavProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        type='button'
        className='ml-auto rounded-md p-2 text-gray-400 hover:bg-gray-100 lg:hidden'
        onClick={() => setIsOpen(true)}
      >
        <Menu className='h-6 w-6' />
      </button>
    );
  }

  return (
    <div>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </div>
    </div>
  );
};

export default MobileNav;
