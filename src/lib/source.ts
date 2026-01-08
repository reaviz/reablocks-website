import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { docsCollection, docsMeta, blocksCollection, blocksMeta } from '../../.source';

export const docs = loader({
  baseUrl: '/docs',
  source: createMDXSource(docsCollection, docsMeta),
});

export const blocks = loader({
  baseUrl: '/blocks',
  source: createMDXSource(blocksCollection, blocksMeta),
});
