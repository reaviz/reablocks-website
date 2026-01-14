import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const storiesDir = join(rootDir, 'src', 'stories');
const outputDir = join(rootDir, 'src', 'generated');
const outputFile = join(outputDir, 'story-sources.json');

function extractFunctionSource(content, functionName) {
  const exportRegex = new RegExp(
    `export\\s+(?:const|function)\\s+${functionName}\\b`,
    'g'
  );

  const match = exportRegex.exec(content);
  if (!match) return null;

  const startIndex = match.index;
  let braceCount = 0;
  let parenCount = 0;
  let bracketCount = 0;
  let inString = false;
  let inTemplate = false;
  let stringChar = '';
  let endIndex = startIndex;
  let foundFirstBracket = false;
  let templateDepth = 0;

  for (let i = startIndex; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    const nextChar = i < content.length - 1 ? content[i + 1] : '';

    if (inTemplate) {
      if (char === '`' && prevChar !== '\\') {
        if (templateDepth === 0) {
          inTemplate = false;
        }
      } else if (char === '$' && nextChar === '{') {
        templateDepth++;
      } else if (char === '}' && templateDepth > 0) {
        templateDepth--;
      }
      endIndex = i;
      continue;
    }

    if (inString) {
      if (char === stringChar && prevChar !== '\\') {
        inString = false;
      }
      endIndex = i;
      continue;
    }

    if (char === '`') {
      inTemplate = true;
      templateDepth = 0;
      endIndex = i;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      endIndex = i;
      continue;
    }

    if (char === '/' && nextChar === '/') {
      const lineEnd = content.indexOf('\n', i);
      if (lineEnd !== -1) {
        i = lineEnd;
        endIndex = i;
      }
      continue;
    }

    if (char === '/' && nextChar === '*') {
      const commentEnd = content.indexOf('*/', i + 2);
      if (commentEnd !== -1) {
        i = commentEnd + 1;
        endIndex = i;
      }
      continue;
    }

    if (char === '{') {
      braceCount++;
      foundFirstBracket = true;
    } else if (char === '}') {
      braceCount--;
    } else if (char === '(') {
      parenCount++;
      foundFirstBracket = true;
    } else if (char === ')') {
      parenCount--;
    } else if (char === '[') {
      bracketCount++;
    } else if (char === ']') {
      bracketCount--;
    }

    endIndex = i;

    if (foundFirstBracket && braceCount === 0 && parenCount === 0 && bracketCount === 0) {
      if (char === ')' || char === '}') {
        const nextNonWhitespace = content.slice(i + 1).match(/\S/);
        if (!nextNonWhitespace || nextNonWhitespace[0] === ';' || nextNonWhitespace[0] === '\n') {
          break;
        }
        if (nextNonWhitespace && (nextNonWhitespace[0] === 'e' || nextNonWhitespace[0] === '\n')) {
          break;
        }
      }
    }
  }

  let extracted = content.slice(startIndex, endIndex + 1).trim();
  
  if (extracted.endsWith(';')) {
    extracted = extracted.slice(0, -1);
  }

  return extracted;
}

function extractExportedFunctions(content) {
  const exportPattern = /export\s+(?:const|function)\s+(\w+)/g;
  const functions = [];
  let match;

  while ((match = exportPattern.exec(content)) !== null) {
    const name = match[1];
    if (name !== 'default') {
      functions.push(name);
    }
  }

  return functions;
}

function getAllStoryFiles(dir, files = []) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getAllStoryFiles(fullPath, files);
    } else if (entry.endsWith('.story.tsx') || entry.endsWith('.story.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

function generateStorySources() {
  console.log('Generating story sources...');

  const storyFiles = getAllStoryFiles(storiesDir);
  const sources = {};

  for (const filePath of storyFiles) {
    const relativePath = relative(storiesDir, filePath);
    const content = readFileSync(filePath, 'utf-8');
    const functions = extractExportedFunctions(content);

    for (const funcName of functions) {
      const source = extractFunctionSource(content, funcName);
      if (source) {
        const key = `${relativePath}:${funcName}`;
        sources[key] = source;
      }
    }
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputFile, JSON.stringify(sources, null, 2));

  console.log(`Generated ${Object.keys(sources).length} story sources to ${outputFile}`);
}

generateStorySources();
