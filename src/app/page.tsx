import { Metadata } from 'next';
import React from 'react';
import { LandingShell } from '@/components/main/landing/LandingShell';
import { getReablocksRelease } from '@/utils/reablocks-version';

const TITLE = 'Reablocks — Stop coding from scratch. Build faster. Launch sooner.';
const DESCRIPTION =
  'A premium open-source React component library for ambitious enterprise apps. 70+ components, 12 full-page blocks, AI-native skill packs, and theming as an object — not a config file.';

export const dynamic = 'force-static';
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
        alt: 'Reablocks — Stop coding from scratch. Build faster. Launch sooner.'
      }
    ]
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: ['/preview.png']
  }
};

const buildJsonLd = (version: string) => ({
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
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://reablocks.dev/docs?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': 'https://reablocks.dev/#source',
      name: 'Reablocks',
      codeRepository: 'https://github.com/reaviz/reablocks',
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React',
      license: 'https://github.com/reaviz/reablocks/blob/master/LICENSE',
      author: { '@id': 'https://reablocks.dev/#organization' }
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://reablocks.dev/#application',
      name: 'Reablocks',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'React Component Library',
      operatingSystem: 'Cross-platform (Web)',
      softwareVersion: version,
      url: 'https://reablocks.dev',
      downloadUrl: 'https://www.npmjs.com/package/reablocks',
      description: DESCRIPTION,
      license: 'https://github.com/reaviz/reablocks/blob/master/LICENSE',
      author: { '@id': 'https://reablocks.dev/#organization' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Reablocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reablocks is a premium open-source React component library with 70+ accessible components, 12 full-page blocks, AI-native skill packs, and theming built on Tailwind CSS v4 and Motion.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I install Reablocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install via npm install reablocks (or pnpm/yarn/bun equivalent), import the prebuilt stylesheet, and wrap your app in the ThemeProvider component.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is Reablocks free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — Reablocks is open source under the Apache 2.0 license and free for personal and commercial projects.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does Reablocks work with AI coding agents?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Reablocks ships machine-readable skill packs (with prop schemas, usage examples, and prebuilt blocks) consumed natively by Claude Code, Cursor, GitHub Copilot, and other AI agents.'
          }
        },
        {
          '@type': 'Question',
          name: 'How is theming handled in Reablocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Themes are plain TypeScript objects you extend with extendTheme. Override design tokens for color, radius, density, or any per-component slot. Light and dark variants ship by default.'
          }
        }
      ]
    }
  ]
});

export default async function Home() {
  const release = await getReablocksRelease();
  const jsonLd = buildJsonLd(release.version);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingShell release={release} />
    </>
  );
}
