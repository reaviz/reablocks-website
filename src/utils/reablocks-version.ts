export interface ReablocksRelease {
  version: string;
  publishedAt: string;
}

const FALLBACK: ReablocksRelease = {
  version: '10.0.1',
  publishedAt: '2026-05-13T11:36:00.742Z'
};

export async function getReablocksRelease(): Promise<ReablocksRelease> {
  try {
    const res = await fetch('https://registry.npmjs.org/reablocks', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return FALLBACK;
    const data = (await res.json()) as {
      'dist-tags'?: { latest?: string };
      time?: Record<string, string>;
    };
    const version = data['dist-tags']?.latest;
    const publishedAt = version ? data.time?.[version] : undefined;
    if (!version || !publishedAt) return FALLBACK;
    return { version, publishedAt };
  } catch {
    return FALLBACK;
  }
}

