import { FrameworkRecipe } from './recipes';
import { REABLOCKS_THEME_TOKENS } from './reablocks-theme-tokens';

/**
 * 'default' — the standard reablocks `theme` (Tailwind token block, mirrors
 * the CLI). 'unify' — the production Unify Theme (Figma-generated CSS token
 * layers + downloaded `themeUnify.ts`; assets are files, not npm imports).
 */
export type ThemeVariant = 'default' | 'unify';

// `T` is a literal backtick and `FENCE` a markdown code fence. Referencing them
// via interpolation keeps every literal backtick out of this file's template
// literals, so the generated markdown can be edited without escaping headaches.
const T = '`';
const FENCE = '```';

function fenced(lang: string, body: string): string {
  return `${FENCE}${lang}\n${body}\n${FENCE}`;
}

function header(recipe: FrameworkRecipe, variant: ThemeVariant): string {
  const intro =
    variant === 'unify'
      ? `You are an expert React engineer. Add **reablocks** with the **Unify Theme** — the production design-token theme synced with the Unify Design System (UDS) in Figma, built on **Tailwind CSS v4** — to my existing **${recipe.label}** project.`
      : `You are an expert React engineer. Add **reablocks** — a React UI component library styled with **Tailwind CSS v4** and themed through its ${T}<ThemeProvider>${T} — to my existing **${recipe.label}** project.`;

  return [
    variant === 'unify'
      ? `# Add reablocks (Unify Theme) to my ${recipe.label} project`
      : `# Add reablocks to my ${recipe.label} project`,
    '',
    intro,
    '',
    `Start by installing Reaviz's official AI skills (Step 1) so you have the canonical, up-to-date reablocks knowledge loaded, then follow the remaining steps exactly. Do not substitute a different UI or styling library, and do not change my app architecture beyond what these steps require.`
  ].join('\n');
}

function guardrails(variant: ThemeVariant): string {
  const alwaysThemeBullets =
    variant === 'unify'
      ? [
          `- Install the Unify assets as files (Step 4) — the CSS token layers and the ${T}themeUnify.ts${T} module live in the repo, not in the npm package.`,
          `- Wrap the app with ${T}<ThemeProvider theme={theme}>${T} where ${T}theme${T} comes from the ${T}themeUnify${T} module (${T}ThemeProvider${T} itself comes from ${T}reablocks${T}).`
        ]
      : [
          `- Put the reablocks theme token block in the **same stylesheet** that has ${T}@import "tailwindcss"${T}.`,
          `- Wrap the app with ${T}<ThemeProvider theme={theme}>${T} from ${T}reablocks${T}.`
        ];

  const neverThemeBullets =
    variant === 'unify'
      ? [
          `- Do NOT import the default ${T}theme${T} from ${T}reablocks${T} — for Unify the theme comes from the ${T}themeUnify${T} module.`,
          '- Do NOT try to import Unify CSS or a Unify theme from the reablocks npm package — they are not shipped; the assets are installed as files in Step 4.',
          `- Do NOT paste the default reablocks token block into the stylesheet — ${T}tw.css${T} already registers every Unify token.`,
          `- Do NOT reorder the imports inside ${T}index.css${T} — ${T}tw.css${T} must come last.`
        ]
      : [
          '- Do NOT omit the theme token block — without it reablocks components render unstyled.'
        ];

  return [
    '## ALWAYS do',
    '',
    `- Install the official reablocks AI skills first (${T}npx skills add reaviz/skills${T}) and follow them — they carry Reaviz's canonical, current reablocks + Tailwind v4 guidance.`,
    `- Use **Tailwind CSS v4** — the ${T}@import "tailwindcss"${T} + ${T}@source${T} + ${T}@theme${T} syntax. reablocks targets v4, not v3.`,
    '- Install only the dependencies listed below.',
    ...alwaysThemeBullets,
    `- Put a ${T}theme-dark${T} (or ${T}theme-light${T}) class on the root ${T}<html>${T} element.`,
    '- Use my existing package manager — detect it from the lockfile (npm / pnpm / yarn / bun) and translate the install commands accordingly.',
    '',
    '## NEVER do',
    '',
    `- Do NOT use Tailwind v3 syntax — no ${T}@tailwind${T} directives, no ${T}tailwind.config${T} content globs. reablocks needs v4.`,
    '- Do NOT install or scaffold a different component library or design system.',
    ...neverThemeBullets,
    `- Do NOT place ${T}<ThemeProvider>${T} inside a Server Component (Next.js App Router); it must live in a Client Component.`
  ].join('\n');
}

function steps(recipe: FrameworkRecipe, variant: ThemeVariant): string {
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
    ...themeSteps(recipe, variant, htmlLang)
  ].join('\n');
}

function themeSteps(
  recipe: FrameworkRecipe,
  variant: ThemeVariant,
  htmlLang: string
): string[] {
  const themeClassStep = [
    `### 5. Set the default theme class on ${T}<html>${T}`,
    '',
    `In ${T}${recipe.htmlHost}${T}, add the theme class to the root ${T}<html>${T} tag (set it once):`,
    '',
    fenced(htmlLang, recipe.htmlSnippet),
    '',
    variant === 'unify'
      ? `Swap ${T}theme-dark${T} for ${T}theme-light${T} to default to light mode. Unify also recognizes ${T}.dark${T} / ${T}.light${T} classes and ${T}data-theme${T} attributes.`
      : `Swap ${T}theme-dark${T} for ${T}theme-light${T} to default to light mode.`
  ];

  if (variant === 'unify') {
    return [
      '### 4. Install the Unify Theme assets',
      '',
      `The Unify Theme is two parts — Figma-generated CSS token layers and a TypeScript component-theme module. Neither ships inside the ${T}reablocks${T} npm package; install both as files:`,
      '',
      `**a) Download the component-theme module** to ${T}${recipe.unify.themeUnifyPath}${T}:`,
      '',
      fenced(
        'sh',
        `curl -o ${recipe.unify.themeUnifyPath} https://reablocks.dev/assets/themeUnify.ts`
      ),
      '',
      `**b) Copy the CSS token layers** — ${T}index.css${T}, ${T}common.css${T}, ${T}root.css${T}, ${T}dark.css${T}, ${T}light.css${T}, ${T}tw.css${T} — into ${T}${recipe.unify.stylesDir}/${T}. They live at ${T}src/assets/styles/${T} on the ${T}main-react-query${T} branch of the official Unify starter:`,
      '',
      'https://github.com/goodcodeus/app-starter/tree/main-react-query',
      '',
      `(If the team uses the Unify Design System in Figma, export fresh layers instead: Reablocks Figma Plugin → **Export Styles** → unzip into ${T}${recipe.unify.stylesDir}/${T}.)`,
      '',
      `${T}tw.css${T} already contains ${T}@import 'tailwindcss'${T}, the ${T}@source${T} directive for reablocks, and the ${T}@theme inline${T} token registration — do not add the default reablocks token block on top. Verify the ${T}@source${T} path resolves to ${T}node_modules/reablocks${T} relative to ${T}${recipe.unify.stylesDir}/tw.css${T}; if components render unstyled, adjust the ${T}../${T} depth.`,
      '',
      ...themeClassStep,
      '',
      '### 6. Wrap your app with ThemeProvider + import the styles',
      '',
      `Import the Unify styles entry once at the app root and wrap the app with ${T}<ThemeProvider>${T}, using the ${T}theme${T} from the ${T}themeUnify${T} module — NOT the default theme from the package. Keep the import order inside ${T}index.css${T} unchanged: ${T}tw.css${T} must stay last:`,
      '',
      fenced('tsx', recipe.unify.providerSnippet)
    ];
  }

  return [
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
    ...themeClassStep,
    '',
    '### 6. Wrap your app with ThemeProvider',
    '',
    recipe.providerInstructions,
    '',
    fenced('tsx', recipe.providerSnippet)
  ];
}

function verification(recipe: FrameworkRecipe, variant: ThemeVariant): string {
  const integrationDep = recipe.viteBased
    ? '@tailwindcss/vite'
    : '@tailwindcss/postcss';

  const themeChecks =
    variant === 'unify'
      ? [
          `- [ ] ${T}${recipe.unify.stylesDir}/${T} contains ${T}index.css${T}, ${T}common.css${T}, ${T}root.css${T}, ${T}dark.css${T}, ${T}light.css${T} and ${T}tw.css${T}; ${T}${recipe.unify.themeUnifyPath}${T} exists.`,
          `- [ ] ${T}${recipe.unify.stylesDir}/index.css${T} is imported by the app entry, with ${T}tw.css${T} last in its import chain.`,
          `- [ ] ${T}${recipe.htmlHost}${T} has ${T}${recipe.htmlAttr}="theme-dark"${T} on the ${T}<html>${T} tag.`,
          `- [ ] The app root is wrapped in ${T}<ThemeProvider theme={theme}>${T} with ${T}theme${T} imported from the ${T}themeUnify${T} module.`,
          `- [ ] A ${T}<Button>${T} imported from ${T}reablocks${T} renders with Unify styling (UDS tokens — e.g. ${T}bg-background-brand-base${T} resolves).`
        ]
      : [
          `- [ ] ${T}${recipe.cssPath}${T} starts with ${T}@import "tailwindcss";${T}, then the ${T}@source${T} line, then the ${T}--reablocks-theme${T} token block.`,
          `- [ ] ${T}${recipe.cssPath}${T} is imported by the app entry so the styles actually load.`,
          `- [ ] ${T}${recipe.htmlHost}${T} has ${T}${recipe.htmlAttr}="theme-dark"${T} on the ${T}<html>${T} tag.`,
          `- [ ] The app root is wrapped in ${T}<ThemeProvider theme={theme}>${T}.`,
          `- [ ] A ${T}<Button>${T} imported from ${T}reablocks${T} renders styled (rounded corners, blue primary fill).`
        ];

  return [
    '## Verify',
    '',
    'After the changes, confirm each item:',
    '',
    `- [ ] ${T}reablocks${T}, ${T}tailwindcss${T} (v4) and ${T}${integrationDep}${T} are in ${T}package.json${T}.`,
    ...themeChecks,
    '',
    'Report each item as ✅ or ❌ when you are done.'
  ].join('\n');
}

/**
 * Build the self-contained, framework-specific install prompt. The output is
 * Markdown and is used verbatim by both the copy button and the
 * `/install-prompt/<id>` route (`?theme=unify` for the Unify variant).
 */
export function buildInstallPrompt(
  recipe: FrameworkRecipe,
  variant: ThemeVariant = 'default'
): string {
  return [
    header(recipe, variant),
    guardrails(variant),
    steps(recipe, variant),
    verification(recipe, variant)
  ].join('\n\n');
}
