import { Footer, Layout, Navbar } from 'reablocks-docs-theme';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import 'reablocks-docs-theme/style.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reablocks - Open Source ReactJS Component Library',
  description:
    'Beautifully designed, highly customizable, Open Source React components based on Tailwind and Motion.'
};

const footer = (
  <Footer className="flex w-full justify-center">TMP footer</Footer>
);

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Reablocks" width={112} height={24} />
      </div>
    }
    projectLink="https://github.com/reaviz/reagraph"
  />
);
export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className="h-full">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="flex flex-col overflow-x-hidden text-white antialiased dark:bg-gradient-to-b dark:from-[#11111F] dark:from-50% dark:via-[#11111F] dark:to-[#121212]">
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/reaviz/reablocks-website"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 2, autoCollapse: false }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
