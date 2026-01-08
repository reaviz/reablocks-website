import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import 'fumadocs-ui/style.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Reablocks - Open Source ReactJS Component Library',
  description:
    'Beautifully designed, highly customizable, Open Source React components based on Tailwind and Motion.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased font-sans">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
