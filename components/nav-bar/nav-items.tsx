'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useClickAway } from '@/hooks/use-click-away';
import { useEffect, useRef, useState } from 'react';
import NavItem from './nav-item';

type NavItemsProps = {};

const NavItems: React.FC<NavItemsProps> = () => {
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
    <div ref={navRef} className='flex gap-4 h-full'>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <NavItem
          key={category.value}
          category={category}
          open={selectedIndex === index}
          onTrigger={() => onTrigger(index)}
          onClose={() => setSelectedIndex(null)}
        />
      ))}
    </div>
  );
};

export default NavItems;
