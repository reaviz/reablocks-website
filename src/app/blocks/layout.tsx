import { ReactNode } from "react";
import { Layout } from "reablocks-docs-theme";
import { readdirSync } from "fs";
import { join } from "path";

interface BlocksLayoutProps {
  children: ReactNode;
}

interface PageMapItem {
  name: string;
  route: string;
  title: string;
  frontMatter: Record<string, any>;
  children?: PageMapItem[];
}

// Function to recursively scan directories and build page map
async function scanDirectoryRecursive(dir: string, relativePath: string = ""): Promise<PageMapItem[]> {
  const pageMap: PageMapItem[] = [];
  
  try {
    // Try to load meta configuration for this directory
    let meta: Record<string, string> = {};
    
    try {
      const metaPath = relativePath ? `@/content/blocks/${relativePath}/_meta` : "@/content/blocks/_meta";
      const metaModule = await import(metaPath);
      meta = metaModule.default || metaModule;
    } catch (error) {
      // No meta file found, continue with automatic generation
    }
    
    // Get all files and directories
    const files = readdirSync(dir, { withFileTypes: true });
    const mdxFiles = files.filter(file => file.isFile() && (file.name.endsWith('.mdx') || file.name.endsWith('.md')));
    const subDirs = files.filter(file => file.isDirectory() && !file.name.startsWith('_'));
    
    const processedItems = new Set<string>();
    
    // First, add items from meta configuration in order
    for (const [metaKey, metaValue] of Object.entries(meta)) {
      const fileName = metaKey === 'index' ? 'index' : metaKey;
      
      // Extract title from meta value (can be string or object with title property)
      let title: string;
      if (typeof metaValue === 'string') {
        title = metaValue;
      } else if (metaValue && typeof metaValue === 'object' && 'title' in metaValue && typeof (metaValue as any).title === 'string') {
        title = (metaValue as any).title;
      } else {
        title = metaKey.charAt(0).toUpperCase() + metaKey.slice(1);
      }
      
      // Check if it's a file
      const fileExists = mdxFiles.some(file => file.name.replace(/\.(mdx|md)$/, '') === fileName);
      if (fileExists) {
        const route = metaKey === 'index' && relativePath === '' ? '/blocks' : `/blocks/${relativePath ? relativePath + '/' : ''}${metaKey}`;
        pageMap.push({
          name: metaKey === 'index' ? 'index' : metaKey,
          route,
          title,
          frontMatter: {}
        });
        processedItems.add(fileName);
      }
      
      // Check if it's a directory
      const dirExists = subDirs.some(subDir => subDir.name === fileName);
      if (dirExists) {
        const subDirPath = join(dir, fileName);
        const subDirRelativePath = relativePath ? `${relativePath}/${fileName}` : fileName;
        const children = await scanDirectoryRecursive(subDirPath, subDirRelativePath);
        
        pageMap.push({
          name: fileName,
          route: `/blocks/${subDirRelativePath}`,
          title,
          frontMatter: {},
          children: children.length > 0 ? children : undefined
        });
        processedItems.add(fileName);
      }
    }
    
    // Add remaining files not in meta
    mdxFiles.forEach(file => {
      const name = file.name.replace(/\.(mdx|md)$/, '');
      if (!processedItems.has(name)) {
        const route = name === 'index' && relativePath === '' ? '/blocks' : `/blocks/${relativePath ? relativePath + '/' : ''}${name}`;
        const title = name.charAt(0).toUpperCase() + name.slice(1);
        
        pageMap.push({
          name: name === 'index' ? 'index' : name,
          route,
          title,
          frontMatter: {}
        });
      }
    });
    
    // Add remaining directories not in meta
    subDirs.forEach(subDir => {
      if (!processedItems.has(subDir.name)) {
        const subDirPath = join(dir, subDir.name);
        const subDirRelativePath = relativePath ? `${relativePath}/${subDir.name}` : subDir.name;
        
        // Recursively scan subdirectory
        scanDirectoryRecursive(subDirPath, subDirRelativePath).then(children => {
          const title = subDir.name.charAt(0).toUpperCase() + subDir.name.slice(1);
          pageMap.push({
            name: subDir.name,
            route: `/blocks/${subDirRelativePath}`,
            title,
            frontMatter: {},
            children: children.length > 0 ? children : undefined
          });
        });
      }
    });
    
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
  
  return pageMap;
}

// Function to generate pageMap for blocks
async function generateBlocksPageMap(): Promise<PageMapItem[]> {
  const blocksDir = join(process.cwd(), "src/content/blocks");
  return await scanDirectoryRecursive(blocksDir);
}

export default async function BlocksLayout({ children }: BlocksLayoutProps) {
  const pageMap = await generateBlocksPageMap();
  
  return (
    <Layout
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/reaviz/reablocks-website"
      editLink="Edit this page on GitHub"
      sidebar={{ defaultMenuCollapseLevel: 2, autoCollapse: false }}
    >
      {children}
    </Layout>
  );
} 