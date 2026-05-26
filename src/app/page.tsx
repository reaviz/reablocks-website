import { Metadata } from 'next';
import React from 'react';
import { LandingShell } from '@/components/main/landing/LandingShell';
import { getReablocksRelease } from '@/utils/reablocks-version';

const TITLE = 'Reablocks — Real components. Real motion. Shipped.';
const DESCRIPTION =
  'A premium open-source React component library for ambitious enterprise apps. 70+ components, 12 full-page blocks, AI-native skill packs, and theming as an object — not a config file.';

export const runtime = 'edge';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    type: 'website',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Reablocks — Real components. Real motion. Shipped.'
      }
    ]
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: ['/preview.png']
  }
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://reablocks.dev/#organization',
      name: 'Reablocks',
      url: 'https://reablocks.dev',
      logo: 'https://reablocks.dev/logo.svg',
      sameAs: [
        'https://github.com/reaviz/reablocks',
        'https://reaviz.io',
        'https://goodcode.us'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://reablocks.dev/#website',
      url: 'https://reablocks.dev',
      name: 'Reablocks',
      description: DESCRIPTION,
      publisher: { '@id': 'https://reablocks.dev/#organization' },
      inLanguage: 'en-US'
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Reablocks',
      codeRepository: 'https://github.com/reaviz/reablocks',
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React',
      license: 'https://github.com/reaviz/reablocks/blob/master/LICENSE',
      author: { '@id': 'https://reablocks.dev/#organization' }
    }
  ]
};

export default async function Home() {
  const release = await getReablocksRelease();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <LandingShell release={release} />
    </>
  );
}
