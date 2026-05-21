import { Metadata } from 'next';
import React from 'react';
import { LandingShell } from '@/components/main/landing/LandingShell';
import { getReablocksRelease } from '@/utils/reablocks-version';

export const metadata: Metadata = {
  title: 'Reablocks — Real components. Real motion. Shipped.',
  description:
    'A premium React component library for ambitious enterprise apps. 70+ components, 12 full-page blocks, theming as an object — not a config file.'
};

export default async function Home() {
  const release = await getReablocksRelease();
  return <LandingShell release={release} />;
}
