import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs: docsCollection, meta: docsMeta } = defineDocs({
  dir: 'src/content/docs',
});

export const { docs: blocksCollection, meta: blocksMeta } = defineDocs({
  dir: 'src/content/blocks',
});

export default defineConfig();
