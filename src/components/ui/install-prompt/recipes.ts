// Per-framework install recipes. Declarative data consumed by
// `buildInstallPrompt` — each field mirrors exactly what reablocks-cli does for
// that framework, so an AI agent following the generated prompt produces the
// same result as running `npx reablocks-cli@latest init`.

export type FrameworkId = 'next' | 'vite' | 'react-router';

/** Per-framework specifics for the Unify Theme variant. The Unify assets are
 * files in the user's repo (Figma-generated CSS layers + a downloaded
 * `themeUnify.ts`) — they are NOT shipped inside the reablocks npm package. */
export interface UnifyRecipe {
  /** Directory the CSS token layers are copied into. */
  stylesDir: string;
  /** Where to save the downloaded themeUnify.ts module. */
  themeUnifyPath: string;
  /** ThemeProvider wiring incl. the styles-entry import for this framework. */
  providerSnippet: string;
}

export interface FrameworkRecipe {
  /** Stable id, used in the markdown route (`/install-prompt/<id>`). */
  id: FrameworkId;
  /** Human-facing label shown on the card and in the prompt. */
  label: string;
  /** Short tagline shown under the label on the card. */
  tagline: string;
  /** Main stylesheet the CLI wires Tailwind v4 + reablocks into. */
  cssPath: string;
  /**
   * Tailwind v4 `@source` line, with the exact `../` depth for `cssPath`.
   * Tailwind resolves `@source` relative to the stylesheet's own location.
   */
  sourceLine: string;
  /** File that owns the root `<html>` element. */
  htmlHost: string;
  /** JSX (`className`) vs static HTML (`class`) attribute for the host. */
  htmlAttr: 'className' | 'class';
  /** The `<html>` opening tag the user should end up with. */
  htmlSnippet: string;
  /** Prose describing where/how to wrap the app with ThemeProvider. */
  providerInstructions: string;
  /** The ThemeProvider wiring code block for this framework. */
  providerSnippet: string;
  /** True for Vite-powered frameworks (Vite, React Router v7 / Remix). These
   * use the native `@tailwindcss/vite` plugin and need no PostCSS config. */
  viteBased?: boolean;
  /** For Vite-based frameworks: the `vite.config.ts` showing the Tailwind v4
   * plugin added alongside the framework's own plugin. */
  viteConfigSnippet?: string;
  /** Unify Theme variant specifics. */
  unify: UnifyRecipe;
}

const NEXT: FrameworkRecipe = {
  id: 'next',
  label: 'Next.js (App Router)',
  tagline: 'app/ router',
  cssPath: 'src/app/globals.css',
  sourceLine: '@source "../../node_modules/reablocks";',
  htmlHost: 'src/app/layout.tsx',
  htmlAttr: 'className',
  htmlSnippet: '<html lang="en" className="theme-dark">',
  providerInstructions:
    "Server Components can't host React context, so create a client `Providers` component and use it from your existing `src/app/layout.tsx`. (If you already have a providers file, wrap its contents with `<ThemeProvider>` instead of creating a new one.)",
  providerSnippet: `// src/app/providers.tsx  — new client component
'use client';

import { ThemeProvider, theme } from 'reablocks';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

// src/app/layout.tsx  — edit your existing layout:
//   1. import the Providers component
//   2. add the theme class to <html>
//   3. wrap {children} with <Providers>
import { Providers } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="theme-dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`,
  unify: {
    stylesDir: 'src/assets/styles',
    themeUnifyPath: 'src/themeUnify.ts',
    providerSnippet: `// src/app/providers.tsx  — new client component
'use client';

import { ThemeProvider } from 'reablocks';
import { theme } from '../themeUnify';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

// src/app/layout.tsx  — edit your existing layout:
//   1. import the Providers component and the Unify styles entry
//   2. add the theme class to <html>
//   3. wrap {children} with <Providers>
import { Providers } from './providers';
import '../assets/styles/index.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="theme-dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`
  }
};

const VITE: FrameworkRecipe = {
  id: 'vite',
  label: 'Vite',
  tagline: 'React + Vite',
  cssPath: 'src/index.css',
  sourceLine: '@source "../node_modules/reablocks";',
  htmlHost: 'index.html',
  htmlAttr: 'class',
  htmlSnippet: '<html lang="en" class="theme-dark">',
  providerInstructions:
    'Wrap `<App />` with `<ThemeProvider theme={theme}>` in `src/main.tsx`:',
  providerSnippet: `// src/main.tsx
import { ThemeProvider, theme } from 'reablocks';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);`,
  viteBased: true,
  viteConfigSnippet: `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()]
});`,
  unify: {
    stylesDir: 'src/assets/styles',
    themeUnifyPath: 'src/themeUnify.ts',
    providerSnippet: `// src/main.tsx
import { ThemeProvider } from 'reablocks';
import { theme } from './themeUnify';
import './assets/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);`
  }
};

const REACT_ROUTER: FrameworkRecipe = {
  id: 'react-router',
  label: 'React Router (RR7 / Remix)',
  tagline: 'framework mode',
  cssPath: 'app/app.css',
  sourceLine: '@source "../node_modules/reablocks";',
  htmlHost: 'app/root.tsx',
  htmlAttr: 'className',
  htmlSnippet: '<html lang="en" className="theme-dark">',
  providerInstructions:
    'In `app/root.tsx`, wrap `{children}` inside the existing `Layout` component with `<ThemeProvider theme={theme}>`:',
  providerSnippet: `// app/root.tsx
import { ThemeProvider, theme } from 'reablocks';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="theme-dark">
      <head>
        {/* ...existing head... */}
      </head>
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`,
  viteBased: true,
  viteConfigSnippet: `// vite.config.ts
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite'; // Remix: '@remix-run/dev'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()]
});`,
  unify: {
    stylesDir: 'app/assets/styles',
    themeUnifyPath: 'app/themeUnify.ts',
    providerSnippet: `// app/root.tsx
import { ThemeProvider } from 'reablocks';
import { theme } from './themeUnify';
import './assets/styles/index.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="theme-dark">
      <head>
        {/* ...existing head... */}
      </head>
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`
  }
};

export const recipes: Record<FrameworkId, FrameworkRecipe> = {
  next: NEXT,
  vite: VITE,
  'react-router': REACT_ROUTER
};

/** Display order in the picker. */
export const frameworkList: FrameworkRecipe[] = [NEXT, VITE, REACT_ROUTER];

export function getRecipe(id: string): FrameworkRecipe | undefined {
  return (recipes as Record<string, FrameworkRecipe>)[id];
}
