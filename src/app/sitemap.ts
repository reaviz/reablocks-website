import type { MetadataRoute } from 'next';

const SITE_URL = 'https://reablocks.dev';

const BLOCK_PATHS = [
  '/blocks/authentication/forgot-password',
  '/blocks/authentication/login',
  '/blocks/authentication/mfa',
  '/blocks/authentication/register',
  '/blocks/foundation/empty-state',
  '/blocks/foundation/not-found',
  '/blocks/foundation/contact',
  '/blocks/foundation/timeline',
  '/blocks/administration/billing',
  '/blocks/administration/pricing',
  '/blocks/administration/profile',
  '/blocks/administration/team'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blocks`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/docs/getting-started/setup`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/docs/theme/getting-started`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/docs/theme/theme-unify`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/docs/changelog`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    ...BLOCK_PATHS.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ];
  return entries;
}
