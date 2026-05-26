import pkg from '../../package.json';

export interface ReablocksRelease {
  version: string;
  publishedAt: string;
  stars: number;
}

const FALLBACK: ReablocksRelease = {
  version: pkg.dependencies.reablocks.replace(/^[\^~]/, ''),
  publishedAt: '2026-05-13T11:36:00.742Z',
  stars: 186
};

// The full document at https://registry.npmjs.org/reablocks is ~3MB and
// exceeds Next.js's 2MB fetch-cache limit. The cache rejection produced an
// error with `stack: undefined` that crashed the dev RSC client. `cache:
// 'no-store'` bypasses Next's data cache entirely; the page is statically
// generated so this still only runs at build time in production.
async function fetchNpmRelease(): Promise<{
  version: string;
  publishedAt: string;
} | null> {
  try {
    const res = await fetch('https://registry.npmjs.org/reablocks', {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      'dist-tags'?: { latest?: string };
      time?: Record<string, string>;
    };
    const version = data['dist-tags']?.latest;
    const publishedAt = version ? data.time?.[version] : undefined;
    if (!version || !publishedAt) return null;
    return { version, publishedAt };
  } catch {
    return null;
  }
}

async function fetchGithubStars(): Promise<number | null> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/reaviz/reablocks',
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 }
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === 'number'
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

export async function getReablocksRelease(): Promise<ReablocksRelease> {
  const [release, stars] = await Promise.all([
    fetchNpmRelease(),
    fetchGithubStars()
  ]);
  return {
    version: release?.version ?? FALLBACK.version,
    publishedAt: release?.publishedAt ?? FALLBACK.publishedAt,
    stars: stars ?? FALLBACK.stars
  };
}

export function formatStarCount(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return `${k.toFixed(k < 10 ? 1 : 0).replace(/\.0$/, '')}k`;
}

