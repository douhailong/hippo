'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { trpc } from '@/trpc/client';
import { User } from '@prisma/client';

type ProfileDropdownProps = { user: User };

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  const router = useRouter();

  const { mutate } = trpc.auth.signOut.useMutation({
    onSuccess() {
      toast.success('Signed out successfully');
      router.push('/sign-in');
      router.refresh();
    }
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button variant='ghost' size='sm' className='relative'>
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 bg-white text-gray-900' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>{user.email}</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/sell'>Seller Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => mutate()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
