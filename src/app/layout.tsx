import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';

import { NavBar } from '@/components/nav-bar';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import QueryProvider from '@/provider/query-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'hippo',
  description: 'Generated by create next app'
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang='en'>
      <body className={cn('h-full font-sans antialiased', inter.className)}>
        <main className='flex min-h-screen flex-col'>
          <QueryProvider>
            <NavBar />
            <div className='flex-1'>{}</div>
            <Footer />
          </QueryProvider>
        </main>
        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
};

export default RootLayout;
