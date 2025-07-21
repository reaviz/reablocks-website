import { Footer, LandingFooter, Layout, Navbar } from 'reablocks-docs-theme';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import LogoIcon from '../../public/logo.svg';

import 'reablocks-docs-theme/style.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Reablocks - Open Source ReactJS Component Library',
  description:
    'Beautifully designed, highly customizable, Open Source React components based on Tailwind and Motion.'
};

const footer = (
  <Footer className="flex w-full justify-center py-4">
    <LandingFooter
      logo={<LogoIcon className="h-fit w-[150px] text-[var(--foreground)]" />}
      className="py-6 text-base"
      libName="reablocks"
    />
  </Footer>
);

const navbar = (
  <Navbar
    className="font-inter"
    logo={
      <div className="flex items-center gap-2">
        <LogoIcon className="h-fit w-[150px] text-[var(--foreground)]" />
      </div>
    }
    projectLink="https://github.com/reaviz/reablocks"
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
