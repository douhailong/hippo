'use client';

import React, { useEffect, useState } from 'react';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Command,
  Search
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command';

const SearchCommand = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        className='flex h-8 w-60 items-center justify-between whitespace-nowrap rounded-md bg-zinc-100 px-2 text-sm text-gray-400 max-md:hidden'
        onClick={() => setOpen(true)}
      >
        Type keywords...
        <div className='ml-4 flex h-5 items-center rounded-md bg-white px-1.5 text-xs font-medium leading-5 text-gray-950 ring-1 ring-inset ring-gray-200'>
          <Command className='h-3 w-3' />
          <span>K</span>
        </div>
      </button>
      <Search
        className='h-5 w-5 cursor-pointer md:hidden'
        onClick={() => setOpen(true)}
      />
      <CommandDialog open={open} onOpenChange={() => setOpen(false)}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem>
              <Calendar className='mr-2 h-4 w-4' />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className='mr-2 h-4 w-4' />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className='mr-2 h-4 w-4' />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
