import { loader } from 'fumadocs-core/source';
import { resolveFiles } from 'fumadocs-mdx';
import { docsCollection, docsMeta, blocksCollection, blocksMeta } from '../../.source';

export const docs = loader({
  baseUrl: '/docs',
  source: {
    files: resolveFiles({ docs: docsCollection, meta: docsMeta }),
  },
});

export const blocks = loader({
  baseUrl: '/blocks',
  source: {
    files: resolveFiles({ docs: blocksCollection, meta: blocksMeta }),
  },
});
