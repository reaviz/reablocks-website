// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var { docs: docsCollection, meta: docsMeta } = defineDocs({
  dir: "src/content/docs"
});
var { docs: blocksCollection, meta: blocksMeta } = defineDocs({
  dir: "src/content/blocks"
});
var source_config_default = defineConfig();
export {
  blocksCollection,
  blocksMeta,
  source_config_default as default,
  docsCollection,
  docsMeta
};
