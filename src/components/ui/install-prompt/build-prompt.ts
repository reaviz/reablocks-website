import { FrameworkRecipe } from './recipes';
import { REABLOCKS_THEME_TOKENS } from './reablocks-theme-tokens';

// `T` is a literal backtick and `FENCE` a markdown code fence. Referencing them
// via interpolation keeps every literal backtick out of this file's template
// literals, so the generated markdown can be edited without escaping headaches.
const T = '`';
const FENCE = '```';

function fenced(lang: string, body: string): string {
  return `${FENCE}${lang}\n${body}\n${FENCE}`;
}

function header(recipe: FrameworkRecipe): string {
  return [
    `# Add reablocks to my ${recipe.label} project`,
    '',
    `You are an expert React engineer. Add **reablocks** — a React UI component library styled with **Tailwind CSS v4** and themed through its ${T}<ThemeProvider>${T} — to my existing **${recipe.label}** project.`,
    '',
    `Start by installing Reaviz's official AI skills (Step 1) so you have the canonical, up-to-date reablocks knowledge loaded, then follow the remaining steps exactly. Do not substitute a different UI or styling library, and do not change my app architecture beyond what these steps require.`
  ].join('\n');
}

function guardrails(): string {
  return [
    '## ALWAYS do',
    '',
    `- Install the official reablocks AI skills first (${T}npx skills add reaviz/skills${T}) and follow them — they carry Reaviz's canonical, current reablocks + Tailwind v4 guidance.`,
    `- Use **Tailwind CSS v4** — the ${T}@import "tailwindcss"${T} + ${T}@source${T} + ${T}@theme${T} syntax. reablocks targets v4, not v3.`,
    '- Install only the dependencies listed below.',
    `- Put the reablocks theme token block in the **same stylesheet** that has ${T}@import "tailwindcss"${T}.`,
    `- Wrap the app with ${T}<ThemeProvider theme={theme}>${T} from ${T}reablocks${T}.`,
    `- Put a ${T}theme-dark${T} (or ${T}theme-light${T}) class on the root ${T}<html>${T} element.`,
    '- Use my existing package manager — detect it from the lockfile (npm / pnpm / yarn / bun) and translate the install commands accordingly.',
    '',
    '## NEVER do',
    '',
    `- Do NOT use Tailwind v3 syntax — no ${T}@tailwind${T} directives, no ${T}tailwind.config${T} content globs. reablocks needs v4.`,
    '- Do NOT install or scaffold a different component library or design system.',
    '- Do NOT omit the theme token block — without it reablocks components render unstyled.',
    `- Do NOT place ${T}<ThemeProvider>${T} inside a Server Component (Next.js App Router); it must live in a Client Component.`
  ].join('\n');
}

function steps(recipe: FrameworkRecipe): string {
  const installNote =
    '(Use the equivalent for your package manager — e.g. ' +
    `${T}pnpm add${T} / ${T}pnpm add -D${T}, ${T}yarn add${T} / ${T}yarn add -D${T}, ${T}bun add${T} / ${T}bun add -d${T}.)`;

  // Static-HTML hosts (Vite's index.html) use `class`; JSX hosts use `tsx`.
  const htmlLang = recipe.htmlAttr === 'class' ? 'html' : 'tsx';

  // Tailwind v4 integrates per build tool: Vite-based frameworks use the
  // `@tailwindcss/vite` plugin (no PostCSS config); Next.js runs CSS through
  // PostCSS, so it needs `@tailwindcss/postcss` in postcss.config.
  const integrationDep = recipe.viteBased
    ? '@tailwindcss/vite'
    : '@tailwindcss/postcss';

  const integrationStep = recipe.viteBased
    ? [
        '### 3. Enable the Tailwind v4 Vite plugin',
        '',
        `Add the ${T}@tailwindcss/vite${T} plugin to your ${T}vite.config.ts${T}, next to the framework's own plugin. Vite-based projects do **not** need a PostCSS config for Tailwind:`,
        '',
        fenced('ts', recipe.viteConfigSnippet ?? ''),
        '',
        `If a ${T}postcss.config.*${T} already adds Tailwind, remove that entry — use one integration, not both.`
      ]
    : [
        '### 3. Enable the Tailwind v4 PostCSS plugin',
        '',
        `Next.js processes CSS through PostCSS, so add the Tailwind v4 plugin to your PostCSS config (${T}postcss.config.mjs${T} — create it if missing):`,
        '',
        fenced(
          'js',
          "// postcss.config.mjs\nexport default {\n  plugins: {\n    '@tailwindcss/postcss': {}\n  }\n};"
        ),
        '',
        `If a ${T}postcss.config.{js,cjs,mjs,ts}${T} already exists, add the ${T}@tailwindcss/postcss${T} plugin to that file instead of creating a second config.`
      ];

  return [
    '## Steps',
    '',
    '### 1. Install the reablocks AI skills',
    '',
    `Install Reaviz's official AI skills so you have the canonical, always-current reablocks API + Tailwind v4 setup knowledge loaded before you start:`,
    '',
    fenced('sh', 'npx skills add reaviz/skills'),
    '',
    `(Team alternative: symlink the ${T}reablocks${T} skill tree into ${T}.claude/skills/${T}.) Once installed, follow the skills' guidance — the steps below match it.`,
    '',
    '### 2. Install dependencies',
    '',
    fenced(
      'sh',
      `npm install reablocks\nnpm install -D tailwindcss@4 ${integrationDep}`
    ),
    '',
    installNote,
    '',
    ...integrationStep,
    '',
    '### 4. Wire Tailwind v4 + reablocks into your stylesheet',
    '',
    `Open ${T}${recipe.cssPath}${T} (your main stylesheet) and add this at the very top:`,
    '',
    fenced('css', `@import "tailwindcss";\n${recipe.sourceLine}`),
    '',
    `**The ${T}@source${T} path matters.** It is resolved relative to the stylesheet's own location, so count the directories from ${T}${recipe.cssPath}${T} up to ${T}node_modules${T} and use that many ${T}../${T} segments. The line above is correct for ${T}${recipe.cssPath}${T}; recompute it only if you move the stylesheet.`,
    '',
    `Then paste the reablocks theme token block immediately after the ${T}@source${T} line. It defines the reablocks color palette, ${T}@custom-variant${T} rules, and ${T}@theme${T} tokens:`,
    '',
    fenced('css', REABLOCKS_THEME_TOKENS.trimEnd()),
    '',
    `### 5. Set the default theme class on ${T}<html>${T}`,
    '',
    `In ${T}${recipe.htmlHost}${T}, add the theme class to the root ${T}<html>${T} tag (set it once):`,
    '',
    fenced(htmlLang, recipe.htmlSnippet),
    '',
    `Swap ${T}theme-dark${T} for ${T}theme-light${T} to default to light mode.`,
    '',
    '### 6. Wrap your app with ThemeProvider',
    '',
    recipe.providerInstructions,
    '',
    fenced('tsx', recipe.providerSnippet)
  ].join('\n');
}

function verification(recipe: FrameworkRecipe): string {
  const integrationDep = recipe.viteBased
    ? '@tailwindcss/vite'
    : '@tailwindcss/postcss';
  return [
    '## Verify',
    '',
    'After the changes, confirm each item:',
    '',
    `- [ ] ${T}reablocks${T}, ${T}tailwindcss${T} (v4) and ${T}${integrationDep}${T} are in ${T}package.json${T}.`,
    `- [ ] ${T}${recipe.cssPath}${T} starts with ${T}@import "tailwindcss";${T}, then the ${T}@source${T} line, then the ${T}--reablocks-theme${T} token block.`,
    `- [ ] ${T}${recipe.cssPath}${T} is imported by the app entry so the styles actually load.`,
    `- [ ] ${T}${recipe.htmlHost}${T} has ${T}${recipe.htmlAttr}="theme-dark"${T} on the ${T}<html>${T} tag.`,
    `- [ ] The app root is wrapped in ${T}<ThemeProvider theme={theme}>${T}.`,
    `- [ ] A ${T}<Button>${T} imported from ${T}reablocks${T} renders styled (rounded corners, blue primary fill).`,
    '',
    'Report each item as ✅ or ❌ when you are done.'
  ].join('\n');
}

/**
 * Build the self-contained, framework-specific install prompt. The output is
 * Markdown and is used verbatim by both the copy button and the
 * `/install-prompt/<id>` route.
 */
export function buildInstallPrompt(recipe: FrameworkRecipe): string {
  return [
    header(recipe),
    guardrails(),
    steps(recipe),
    verification(recipe)
  ].join('\n\n');
}
