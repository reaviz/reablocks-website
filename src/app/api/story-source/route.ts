import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Extracts the component name from the story file
 * @param fileContent - The content of the story file
 * @returns The component name
 */
const extractComponentName = (fileContent: string): string => {
  // First, try to extract from Storybook meta object: const meta: Meta<typeof Component> = { component: Component }
  const metaComponentMatch = fileContent.match(/component:\s*([A-Z][a-zA-Z0-9]*)/);
  if (metaComponentMatch) {
    return metaComponentMatch[1];
  }

  // Try to extract from Meta type: Meta<typeof ComponentName>
  const metaTypeMatch = fileContent.match(/Meta<typeof\s+([A-Z][a-zA-Z0-9]*)/);
  if (metaTypeMatch) {
    return metaTypeMatch[1];
  }

  // Look for patterns like: export default { component: ComponentName }
  const defaultExportMatch = fileContent.match(/export\s+default\s+\{\s*component:\s*([^,\s}]+)/);
  if (defaultExportMatch) {
    return defaultExportMatch[1];
  }

  // Look for patterns like: export default ComponentName
  const directExportMatch = fileContent.match(/export\s+default\s+([^;{\s]+)/);
  if (directExportMatch && !directExportMatch[1].includes('meta')) {
    return directExportMatch[1];
  }

  // Look for component imports (excluding Storybook types)
  const storyBookTypes = ['Meta', 'StoryObj', 'StoryFn', 'Story'];
  const importMatches = fileContent.matchAll(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"][^'"]*['"]/g);
  
  for (const match of importMatches) {
    const imports = match[1].split(',');
    for (const imp of imports) {
      const cleanImport = imp.trim().replace(/\s+as\s+.*$/, ''); // Remove 'as alias'
      const componentMatch = cleanImport.match(/^([A-Z][a-zA-Z0-9]*)/);
      if (componentMatch && !storyBookTypes.includes(componentMatch[1])) {
        return componentMatch[1];
      }
    }
  }

  // Look for default imports: import ComponentName from './component'
  const defaultImportMatch = fileContent.match(/import\s+([A-Z][a-zA-Z0-9]*)\s+from/);
  if (defaultImportMatch && !storyBookTypes.includes(defaultImportMatch[1])) {
    return defaultImportMatch[1];
  }

  return 'Component';
};

const generateCSFStorySource = (componentName: string, args: string): string => {
  // Parse the args and convert to JSX props
  const propsArray: string[] = [];
  
  // Clean up the args string and split by lines first, then by commas
  const cleanArgs = args.replace(/\s+/g, ' ').trim();
  
  // Split by commas but be careful about nested objects/arrays
  const argPairs = [];
  let current = '';
  let depth = 0;
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < cleanArgs.length; i++) {
    const char = cleanArgs[i];
    
    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && cleanArgs[i-1] !== '\\') {
      inString = false;
    } else if (!inString) {
      if (char === '{' || char === '[') {
        depth++;
      } else if (char === '}' || char === ']') {
        depth--;
      } else if (char === ',' && depth === 0) {
        argPairs.push(current.trim());
        current = '';
        continue;
      }
    }
    
    current += char;
  }
  
  if (current.trim()) {
    argPairs.push(current.trim());
  }
  
  // Process each key-value pair
  for (const pair of argPairs) {
    const colonIndex = pair.indexOf(':');
    if (colonIndex !== -1) {
      const key = pair.substring(0, colonIndex).trim();
      const value = pair.substring(colonIndex + 1).trim();
      
      if (value === 'true') {
        propsArray.push(key);
      } else if (value === 'false') {
        // Don't include false boolean props
      } else if (value.startsWith('"') || value.startsWith("'")) {
        // String value
        propsArray.push(`${key}=${value}`);
      } else if (!isNaN(Number(value))) {
        // Number value
        propsArray.push(`${key}={${value}}`);
      } else {
        // Other values (objects, arrays, etc.)
        propsArray.push(`${key}={${value}}`);
      }
    }
  }
  
  const propsString = propsArray.length > 0 ? ' ' + propsArray.join(' ') : '';
  return `() => <${componentName}${propsString} />;`;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storyPath = searchParams.get('storyPath');
  const functionName = searchParams.get('functionName');

  if (!storyPath || !functionName) {
    return NextResponse.json(
      { error: 'Missing storyPath or functionName parameter' },
      { status: 400 }
    );
  }

  try {
    // Read the story file from the filesystem
    const filePath = join(process.cwd(), 'src', 'stories', storyPath);
    const fileContent = readFileSync(filePath, 'utf-8');

    // Extract component name from default export
    const componentName = extractComponentName(fileContent);

    // Try to extract as function first (arrow function format)
    const functionRegex = new RegExp(
      `export\\s+const\\s+${functionName}\\s*=\\s*\\([^)]*\\)\\s*=>\\s*([\\s\\S]*?)(?=\\n\\n|\\nexport|$)`,
      'g'
    );

    const functionMatch = functionRegex.exec(fileContent);

    if (functionMatch) {
      let functionBody = functionMatch[1].trim();

      // Remove trailing semicolon if present
      if (functionBody.endsWith(';')) {
        functionBody = functionBody.slice(0, -1);
      }

      const result = `() => ${functionBody};`;
      return NextResponse.json({ source: result });
    }

    // Try to extract as CSF story object (Storybook format)
    // Use a more precise approach to capture the entire story object
    const storyPattern = `export\\s+const\\s+${functionName}\\s*:[^=]*=\\s*\\{`;
    const storyStartMatch = fileContent.match(new RegExp(storyPattern));
    
    let storyObject = '';
    let objectFound = false;
    
    if (storyStartMatch) {
      const matchIndex = storyStartMatch.index;
      if (matchIndex !== undefined) {
        const startIndex = matchIndex + storyStartMatch[0].length - 1; // Include the opening brace
        
        // Find the matching closing brace
        let braceCount = 0;
        let endIndex = -1;
        let inString = false;
        let stringChar = '';
        
        for (let i = startIndex; i < fileContent.length; i++) {
          const char = fileContent[i];
          
          if (!inString && (char === '"' || char === "'")) {
            inString = true;
            stringChar = char;
          } else if (inString && char === stringChar && fileContent[i - 1] !== '\\') {
            inString = false;
          } else if (!inString) {
            if (char === '{') {
              braceCount++;
            } else if (char === '}') {
              braceCount--;
              if (braceCount === 0) {
                endIndex = i;
                break;
              }
            }
          }
        }
        
        if (endIndex !== -1) {
          storyObject = fileContent.substring(startIndex + 1, endIndex).trim();
          objectFound = true;
        }
      }
    }
    
    // Fallback regex without type annotation
    if (!objectFound) {
      const fallbackRegex = new RegExp(
        `export\\s+const\\s+${functionName}\\s*=\\s*\\{([\\s\\S]*?)\\}\\s*;?`,
        'g'
      );
      const objectMatch = fallbackRegex.exec(fileContent);
      if (objectMatch) {
        storyObject = objectMatch[1].trim();
        objectFound = true;
      }
    }

    if (objectFound) {
      // Extract args from the story object
      const argsMatch = storyObject.match(/args\s*:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/);
      
      if (argsMatch) {
        const argsContent = argsMatch[1].trim();
        
        if (argsContent) {
          const result = generateCSFStorySource(componentName, argsContent);
          return NextResponse.json({ source: result });
        }
      } else {
        // Manual search for args
        const argsIndex = storyObject.indexOf('args:');
        if (argsIndex !== -1) {
          const afterArgs = storyObject.substring(argsIndex + 5).trim();
          
          if (afterArgs.startsWith('{')) {
            // Find the matching closing brace
            let braceCount = 0;
            let endIndex = -1;
            
            for (let i = 0; i < afterArgs.length; i++) {
              if (afterArgs[i] === '{') {
                braceCount++;
              } else if (afterArgs[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                  endIndex = i;
                  break;
                }
              }
            }
            
            if (endIndex !== -1) {
              const argsContent = afterArgs.substring(1, endIndex).trim();
              const result = generateCSFStorySource(componentName, argsContent);
              return NextResponse.json({ source: result });
            }
          }
        }
      }
      
      // Story object without args or couldn't parse args
      const result = `(args) => <${componentName} {...args} />;`;
      return NextResponse.json({ source: result });
    }

    return NextResponse.json({
      source: `// Function ${functionName} not found in ${storyPath}`
    });

  } catch (error) {
    console.error('Error reading story file:', error);
    return NextResponse.json(
      { 
        error: 'Failed to read story file',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
