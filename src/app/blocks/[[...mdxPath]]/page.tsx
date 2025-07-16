import { useMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import { readdirSync } from "fs";
import { join } from "path";

// TypeScript declaration for webpack's require.context
declare const require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): {
    keys(): string[];
    (id: string): any;
  };
};

// Function to recursively scan directories for blocks
function scanBlocksRecursively(dir: string, relativePath: string = ""): Record<string, string> {
  const blocks: Record<string, string> = {};
  
  try {
    const files = readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = join(dir, file.name);
      const relativeName = relativePath ? `${relativePath}/${file.name}` : file.name;
      
      if (file.isDirectory()) {
        // Recursively scan subdirectories
        const subBlocks = scanBlocksRecursively(fullPath, relativeName);
        Object.assign(blocks, subBlocks);
      } else if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
        const name = file.name.replace(/\.(mdx|md)$/, '');
        const blockPath = relativePath ? `${relativePath}/${name}` : name;
        
        if (name === 'index' && relativePath === '') {
          blocks[""] = name;
        } else {
          blocks[blockPath] = blockPath;
        }
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return blocks;
}

// Function to get available blocks from the file system
function getAvailableBlocks() {
  const blocksDir = join(process.cwd(), "src/content/blocks");
  return scanBlocksRecursively(blocksDir);
}

// Dynamic import function that works with Next.js static analysis
function getBlockImportMapping() {
  // Use webpack's require.context to dynamically import all block files
  // This allows Next.js to analyze the imports while still being dynamic
  const blockContext = require.context('@/content/blocks', true, /\.mdx$/);
  const imports = {};
  
  blockContext.keys().forEach(key => {
    // Convert './administration/billing.mdx' to 'administration/billing'
    const blockPath = key.replace(/^\.\//, '').replace(/\.mdx$/, '');
    imports[blockPath] = () => blockContext(key);
  });
  
  return imports;
}

export function generateStaticParams() {
  const blocks = getAvailableBlocks();
  return Object.keys(blocks).map(path => ({
    mdxPath: path ? path.split('/') : []
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const blockPath = params.mdxPath?.join("/") || "";
  const blocks = getAvailableBlocks();
  const blockName = blocks[blockPath];
  
  if (!blockName) {
    return { title: "Block Not Found" };
  }
  
  // Load title from meta if it exists
  let title = blockName.charAt(0).toUpperCase() + blockName.slice(1);
  
  try {
    // Determine the correct meta path based on the block path
    const pathParts = blockPath.split('/');
    const fileName = pathParts[pathParts.length - 1] || 'index';
    const dirPath = pathParts.slice(0, -1).join('/');
    
    const metaPath = dirPath ? `@/content/blocks/${dirPath}/_meta` : "@/content/blocks/_meta";
    const metaModule = await import(metaPath);
    const meta = metaModule.default || metaModule;
    
    console.log(`[META DEBUG] blockPath: ${blockPath}, fileName: ${fileName}, dirPath: ${dirPath}`);
    console.log(`[META DEBUG] metaPath: ${metaPath}`);
    console.log(`[META DEBUG] meta:`, meta);
    
    // Use meta title if available
    if (meta && meta[fileName]) {
      const metaValue = meta[fileName];
      console.log(`[META DEBUG] Found meta for fileName ${fileName}:`, metaValue);
      if (typeof metaValue === 'string') {
        title = metaValue;
        console.log(`[META DEBUG] Using string title: ${title}`);
      } else if (metaValue && typeof metaValue === 'object' && 'title' in metaValue && typeof (metaValue as any).title === 'string') {
        title = (metaValue as any).title;
        console.log(`[META DEBUG] Using object title: ${title}`);
      }
    } else if (meta && meta[blockName]) {
      const metaValue = meta[blockName];
      console.log(`[META DEBUG] Found meta for blockName ${blockName}:`, metaValue);
      if (typeof metaValue === 'string') {
        title = metaValue;
        console.log(`[META DEBUG] Using string title: ${title}`);
      } else if (metaValue && typeof metaValue === 'object' && 'title' in metaValue && typeof (metaValue as any).title === 'string') {
        title = (metaValue as any).title;
        console.log(`[META DEBUG] Using object title: ${title}`);
      }
    } else {
      console.log(`[META DEBUG] No meta found for ${fileName} or ${blockName}, using default`);
    }
  } catch (error) {
    // Meta file not found, use default title
    console.log(`[META DEBUG] Error loading meta:`, error.message);
  }
  
  console.log(`[META DEBUG] Final title: ${title}`);
  
  return {
    title: `${title} - Reablocks`,
    description: `Pre-built ${blockName} block component for React applications`
  };
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const Wrapper = useMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;
  const blockPath = params.mdxPath?.join("/") || "";
  const blocks = getAvailableBlocks();
  const blockName = blocks[blockPath];
  
  if (!blockName) {
    notFound();
  }
  
  let MDXContent;
  
  try {
    if (blockName === "index") {
      MDXContent = (await import(`@/content/blocks/index.mdx`)).default;
    } else {
      // Get dynamic import mapping
      const blockImports = getBlockImportMapping();
      
      const importFn = blockImports[blockName];
      if (!importFn) {
        throw new Error(`Unknown block: ${blockName}`);
      }
      
      MDXContent = (await importFn()).default;
    }
  } catch (error) {
    console.error(`Failed to load block content for ${blockName}:`, error);
    notFound();
  }
  
  return (
    <Wrapper toc={[]} metadata={{}}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
} 