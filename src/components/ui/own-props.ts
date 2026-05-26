import { Project } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
  skipAddingFilesFromTsConfig: true,
  compilerOptions: {
    exactOptionalPropertyTypes: true,
    strictNullChecks: true
  }
});

const VIRTUAL_FILENAME = '$own-props.ts';

// A prop is considered "own" only if at least one of its declarations lives
// inside the reablocks package. This is a positive allowlist instead of a
// blocklist of inherited base types — much more robust because ts-morph in
// the Next.js build context sometimes returns no declarations at all for
// deeply inherited symbols (React HTMLAttributes, motion-dom, lib.dom, etc.),
// and a blocklist would let those pass through.
const OWN_PATH_PATTERN = /\/reablocks\/dist\//;

interface GetOwnPropertyNamesArgs {
  code: string;
  exportName?: string;
}

export function getOwnPropertyNames({
  code,
  exportName = 'default'
}: GetOwnPropertyNamesArgs): Set<string> {
  const sourceFile = project.createSourceFile(VIRTUAL_FILENAME, code, {
    overwrite: true
  });

  const matches = [];
  for (const [key, decls] of sourceFile.getExportedDeclarations()) {
    if (key === exportName) matches.push(...decls);
  }
  const declaration = matches[0];
  if (!declaration) {
    throw new Error(
      `Can't find "${exportName}" declaration while resolving own props`
    );
  }

  const own = new Set<string>();
  for (const prop of declaration.getType().getProperties()) {
    const decls = prop.getDeclarations();
    if (decls.length === 0) continue;
    const hasOwnDecl = decls.some(d =>
      OWN_PATH_PATTERN.test(d.getSourceFile().getFilePath())
    );
    if (hasOwnDecl) {
      own.add(prop.getName());
    }
  }

  return own;
}
