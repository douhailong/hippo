'use client';

import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const composingRef = useRef(false);
  const [composingValue, setComposingValue] = useState<string>('');

  // const innerValue = composingRef.current ? composingValue : value ?? '';

  function compositionStartHandler(
    e: React.CompositionEvent<HTMLInputElement>
  ) {
    composingRef.current = true;
  }

  function compositionUpdateHandler(
    e: React.CompositionEvent<HTMLInputElement>
  ) {}

  function compositionEndHandler(e: React.CompositionEvent<HTMLInputElement>) {
    if (composingRef.current === true) {
      composingRef.current = false;
      changeHandler(e);
    }
  }

  function changeHandler(
    e:
      | React.CompositionEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.currentTarget.value;

    if (composingRef.current === true) {
      setComposingValue(value);
    } else {
      setComposingValue(value);
      console.log('ll');
    }
  }

  return (
    <div className='flex h-screen w-full flex-col bg-rose-400'>
      <Input
        className='mx-auto mt-60 w-60'
        type='text'
        value={composingValue}
        onChange={changeHandler}
        onCompositionStart={compositionStartHandler}
        onCompositionEnd={compositionEndHandler}
        onCompositionUpdate={compositionUpdateHandler}
      />
    </div>
  );
};

export default Layout;
