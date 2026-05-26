import { Footer, LandingFooter, LastUpdated, Layout, Navbar } from 'reablocks-docs-theme';
import { Head, Search } from 'nextra/components';
import { GitHubIcon } from 'nextra/icons';
import { getPageMap } from 'nextra/page-map';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import LogoIcon from '../../public/logo.svg';

import 'reablocks-docs-theme/style.css';
import '@/styles/globals.css';

const SITE_URL = 'https://reablocks.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Reablocks — Open Source React Component Library',
    template: '%s · Reablocks'
  },
  description:
    'Beautifully designed, highly customizable, open-source React components and full-page blocks built on Tailwind and Motion. 70+ components, theming as an object, AI-native by default.',
  applicationName: 'Reablocks',
  generator: 'Next.js',
  keywords: [
    'React components',
    'React component library',
    'open source UI',
    'Tailwind components',
    'TypeScript components',
    'enterprise React UI',
    'design system',
    'Reablocks',
    'Reaviz',
    'AI-native UI',
    'shadcn alternative',
    'MUI alternative',
    'theming',
    'Motion animations'
  ],
  authors: [{ name: 'Reaviz', url: 'https://github.com/reaviz' }],
  creator: 'Reaviz',
  publisher: 'Good Code',
  category: 'technology',
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  openGraph: {
    type: 'website',
    siteName: 'Reablocks',
    title: 'Reablocks — Open Source React Component Library',
    description:
      'Beautifully designed, highly customizable, open-source React components and full-page blocks built on Tailwind and Motion.',
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Reablocks — Open Source React Component Library'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reablocks — Open Source React Component Library',
    description:
      'Beautifully designed, highly customizable, open-source React components built on Tailwind and Motion.',
    site: '@reaviz_io',
    creator: '@reaviz_io',
    images: ['/preview.png']
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0E0E1A' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ],
  colorScheme: 'dark light'
};

const footer = (
  <Footer className="flex w-full justify-center py-4">
    <LandingFooter
      logo={<LogoIcon className="h-fit w-[150px] text-[var(--foreground)]" />}
      className="py-2 text-base"
      libName="reablocks"
    />
  </Footer>
);

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center gap-2">
        <LogoIcon className="h-fit w-[150px] text-[var(--foreground)]" />
      </div>
    }
    projectLink="https://github.com/reaviz/reablocks"
    projectIcon={<GitHubIcon height="24" />}
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
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend:wght@100..900&family=Fira+Code:wght@400;500&family=Chakra+Petch:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="flex flex-col text-white antialiased dark:bg-gradient-to-b dark:from-[#11111F] dark:from-50% dark:via-[#11111F] dark:to-[#121212]">
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/reaviz/reablocks-website"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 2, autoCollapse: false }}
          footer={footer}
          lastUpdated={<LastUpdated />}
          search={<Search />}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
