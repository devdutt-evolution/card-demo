import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextProvider from './_components/NextProvider';
import type { PropsWithChildren } from 'react';
import Header from './_components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Main layout',
  description: 'create one description',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextProvider>
          <Header />
          {children}
          <div id='modal-root'></div>
        </NextProvider>
      </body>
    </html>
  );
}
