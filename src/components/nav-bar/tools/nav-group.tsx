'use client';

import { useEffect, useRef, useState } from 'react';

import { PRODUCT_CATEGORIES } from '@/config';
import { useClickAway } from '@/hooks/use-click-away';
import NavItem from './nav-item';

type NavGroupProps = {};

const NavGroup: React.FC<NavGroupProps> = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  useClickAway(() => setSelectedIndex(null), navRef);

  const onTrigger = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <div ref={navRef} className='flex h-full gap-4'>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <NavItem
          key={category.value}
          category={category}
          open={selectedIndex === index}
          onTrigger={() => onTrigger(index)}
        />
      ))}
    </div>
  );
};

export default NavGroup;
