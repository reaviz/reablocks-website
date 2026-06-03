import { describe, it, expect } from 'vitest';
import { buildInstallPrompt } from './build-prompt';
import { recipes, frameworkList } from './recipes';

describe('frameworkList', () => {
  it('exposes exactly next, vite and react-router, in order', () => {
    expect(frameworkList.map(r => r.id)).toEqual([
      'next',
      'vite',
      'react-router'
    ]);
  });
});

describe('buildInstallPrompt — sections shared by every framework', () => {
  for (const recipe of frameworkList) {
    describe(recipe.id, () => {
      const prompt = buildInstallPrompt(recipe);

      it('names the target framework', () => {
        expect(prompt).toContain(recipe.label);
      });

      it('installs reablocks + the exact Tailwind v4 dependencies', () => {
        expect(prompt).toContain('npm install reablocks');
        expect(prompt).toContain('tailwindcss@4');
        // PostCSS plugin for Next.js; Vite plugin for Vite-based frameworks.
        if (recipe.viteBased) {
          expect(prompt).toContain('@tailwindcss/vite');
        } else {
          expect(prompt).toContain('@tailwindcss/postcss');
        }
      });

      it('wires the Tailwind v4 integration that matches the build tool', () => {
        if (recipe.viteBased) {
          // Vite-based: the Vite plugin in vite.config — no PostCSS config.
          expect(prompt).toContain('@tailwindcss/vite');
          expect(prompt).toMatch(/vite\.config/);
          expect(prompt).toContain('tailwindcss()');
          expect(prompt).not.toContain("'@tailwindcss/postcss': {}");
        } else {
          // PostCSS-based (Next.js): the PostCSS plugin config.
          expect(prompt).toMatch(/postcss\.config/);
          expect(prompt).toContain("'@tailwindcss/postcss': {}");
          expect(prompt).not.toContain('@tailwindcss/vite');
        }
      });

      it('wires Tailwind v4 + reablocks into the framework stylesheet', () => {
        expect(prompt).toContain('@import "tailwindcss";');
        expect(prompt).toContain(recipe.cssPath);
        expect(prompt).toContain(recipe.sourceLine);
      });

      it('embeds the full reablocks theme token block', () => {
        expect(prompt).toContain('--reablocks-theme');
        expect(prompt).toContain('@custom-variant dark');
        expect(prompt).toContain('@theme static');
      });

      it('sets the default theme class on the html host', () => {
        expect(prompt).toContain(recipe.htmlHost);
        expect(prompt).toContain(`${recipe.htmlAttr}="theme-dark"`);
      });

      it('wraps the app in ThemeProvider imported from reablocks', () => {
        expect(prompt).toContain('<ThemeProvider theme={theme}>');
        expect(prompt).toContain("from 'reablocks'");
      });

      it('includes ALWAYS / NEVER guardrails and a verification checklist', () => {
        expect(prompt).toContain('ALWAYS');
        expect(prompt).toContain('NEVER');
        expect(prompt.toLowerCase()).toContain('verify');
      });

      it('never suggests Tailwind v3 or a competing UI library', () => {
        expect(prompt).not.toContain('@tailwind base');
        expect(prompt).not.toMatch(/content:\s*\[/); // tailwind.config content array
        expect(prompt).not.toMatch(/shadcn|@mui\/material|@chakra-ui/i);
      });
    });
  }
});

describe('buildInstallPrompt — framework specifics', () => {
  it('Next.js uses a use-client Providers wrapper with the right @source depth', () => {
    const prompt = buildInstallPrompt(recipes.next);
    expect(prompt).toContain("'use client'");
    expect(prompt).toContain('app/providers.tsx');
    expect(prompt).toContain('export function Providers');
    expect(prompt).toContain('../../node_modules/reablocks');
  });

  it('Vite wraps <App /> in main.tsx and uses the plain html class attribute', () => {
    const prompt = buildInstallPrompt(recipes.vite);
    expect(prompt).toContain('src/main.tsx');
    expect(prompt).toContain('index.html');
    expect(prompt).toContain('class="theme-dark"');
    expect(prompt).toContain('<App />');
  });

  it('React Router wraps {children} in the root.tsx Layout', () => {
    const prompt = buildInstallPrompt(recipes['react-router']);
    expect(prompt).toContain('app/root.tsx');
    expect(prompt).toContain('{children}');
    expect(prompt).toContain('app/app.css');
  });
});

describe('buildInstallPrompt — review hardening', () => {
  it('Next.js keeps every file path under src/app so the @source depth stays correct', () => {
    const prompt = buildInstallPrompt(recipes.next);
    expect(prompt).toContain('src/app/globals.css');
    expect(prompt).toContain('../../node_modules/reablocks');
    expect(prompt).toContain('src/app/layout.tsx');
    expect(prompt).toContain('src/app/providers.tsx');
    // no bare `app/layout.tsx` / `app/providers.tsx` (without the src/ prefix),
    // which would imply a one-segment @source and leave components unstyled.
    expect(prompt).not.toMatch(/(?<!src\/)\bapp\/layout\.tsx/);
    expect(prompt).not.toMatch(/(?<!src\/)\bapp\/providers\.tsx/);
  });

  it('ties the @source line to the stylesheet path with an explicit depth rule', () => {
    for (const recipe of frameworkList) {
      const prompt = buildInstallPrompt(recipe).toLowerCase();
      expect(prompt).toContain('relative to');
      expect(prompt).toContain('count the'); // "count the directories ..."
    }
  });

  it('guards against a pre-existing PostCSS config instead of blindly creating one', () => {
    expect(buildInstallPrompt(recipes.next).toLowerCase()).toContain(
      'already exists'
    );
  });

  it('uses the @tailwindcss/vite plugin for Vite-based frameworks only', () => {
    expect(buildInstallPrompt(recipes.vite)).toContain('@tailwindcss/vite');
    expect(buildInstallPrompt(recipes['react-router'])).toContain(
      '@tailwindcss/vite'
    );
    // Next.js is not Vite-based — it must stay on the PostCSS plugin.
    expect(buildInstallPrompt(recipes.next)).not.toContain('@tailwindcss/vite');
    expect(buildInstallPrompt(recipes.next)).toContain('@tailwindcss/postcss');
  });

  it('reminds the agent that the stylesheet must be imported by the app', () => {
    for (const recipe of frameworkList) {
      expect(buildInstallPrompt(recipe).toLowerCase()).toContain('imported by');
    }
  });
});

describe('buildInstallPrompt — skills bootstrap', () => {
  it('tells the agent to install the official reablocks AI skills, before anything else', () => {
    for (const recipe of frameworkList) {
      const prompt = buildInstallPrompt(recipe);
      expect(prompt).toContain('npx skills add reaviz/skills');
      // The skills must be installed BEFORE the package install so the agent
      // has the canonical reablocks knowledge loaded first.
      expect(prompt.indexOf('npx skills add reaviz/skills')).toBeLessThan(
        prompt.indexOf('npm install reablocks')
      );
    }
  });

  it('mentions the skills in the ALWAYS guardrails', () => {
    const always = buildInstallPrompt(recipes.next).split('## NEVER')[0];
    expect(always.toLowerCase()).toContain('skills');
  });
});

describe('buildInstallPrompt — Unify theme variant', () => {
  for (const recipe of frameworkList) {
    describe(recipe.id, () => {
      const prompt = buildInstallPrompt(recipe, 'unify');

      it('downloads themeUnify.ts and copies the CSS layers from the starter', () => {
        expect(prompt).toContain('https://reablocks.dev/assets/themeUnify.ts');
        expect(prompt).toContain('goodcodeus/app-starter');
        expect(prompt).toContain('main-react-query');
        expect(prompt).toContain('src/assets/styles'); // starter source path
        expect(prompt).toContain('tw.css');
        expect(prompt).toContain('index.css');
      });

      it('mentions the Figma plugin export as the UDS alternative', () => {
        expect(prompt).toContain('Reablocks Figma Plugin');
        expect(prompt).toContain('Export Styles');
      });

      it('wires ThemeProvider with the themeUnify module, not the default theme', () => {
        expect(prompt).toContain('<ThemeProvider theme={theme}>');
        expect(prompt).toMatch(/from '(\.\.?\/)+themeUnify'/);
        // ThemeProvider still comes from the reablocks package itself
        expect(prompt).toContain("import { ThemeProvider } from 'reablocks';");
      });

      it('never pastes the default token block or references unpublished unify exports', () => {
        expect(prompt).not.toContain('@theme static'); // default-token-block marker
        expect(prompt).not.toContain('--color-black-pearl'); // default palette
        expect(prompt).not.toContain('reablocks/unify.css'); // not shipped on npm
        expect(prompt).not.toContain('themeUnify } from'); // no package import
      });

      it('keeps the skills bootstrap and per-framework Tailwind integration', () => {
        expect(prompt).toContain('npx skills add reaviz/skills');
        if (recipe.viteBased) {
          expect(prompt).toContain('@tailwindcss/vite');
          expect(prompt).not.toContain("'@tailwindcss/postcss': {}");
        } else {
          expect(prompt).toContain("'@tailwindcss/postcss': {}");
        }
      });

      it('imports the styles entry and keeps tw.css last', () => {
        expect(prompt).toContain('./assets/styles/index.css');
        expect(prompt.toLowerCase()).toContain('last');
      });

      it('sets the theme class on the html host', () => {
        expect(prompt).toContain(recipe.htmlHost);
        expect(prompt).toContain(`${recipe.htmlAttr}="theme-dark"`);
      });
    });
  }

  it('defaults to the default theme variant — existing prompts unchanged', () => {
    const prompt = buildInstallPrompt(recipes.next);
    expect(prompt).toContain('@theme static');
    expect(prompt).not.toContain('themeUnify');
  });
});
