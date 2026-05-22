'use client';

import { cn } from '@/utils/cn';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Button, CodeBlock, Icon, SectionHead } from './atoms';

interface StepTab {
  label: string;
  code: string;
}

interface Step {
  key: string;
  title: string;
  blurb: string;
  docHref: string;
  docLabel: string;
  code?: string;
  tabs?: StepTab[];
}

const STEPS: Step[] = [
  {
    key: 'install',
    title: 'Install',
    blurb: 'One package, zero peer-dependency dance.',
    docHref: '/docs/getting-started/setup#1-install-reablocks',
    docLabel: 'Setup guide',
    tabs: [
      { label: 'npm', code: 'npm install reablocks motion' },
      { label: 'pnpm', code: 'pnpm add reablocks motion' },
      { label: 'yarn', code: 'yarn add reablocks motion' },
      { label: 'bun', code: 'bun add reablocks motion' }
    ]
  },
  {
    key: 'styles',
    title: 'Import styles',
    blurb: 'One line in your global CSS — Tailwind layers are already wired up.',
    docHref: '/docs/getting-started/setup#3-import-tailwind-in-your-css',
    docLabel: 'Tailwind setup',
    code: `@import "../node_modules/reablocks/dist/index.css";`
  },
  {
    key: 'theme',
    title: 'Theme',
    blurb:
      'Override any component with Tailwind classes — type-safe, fully composable.',
    docHref: '/docs/theme/getting-started#extending-the-reablocks-theme',
    docLabel: 'Theme guide',
    code: `import { PartialReablocksTheme, ButtonTheme } from 'reablocks';

const buttonTheme: ButtonTheme = {
  base: 'bg-lime-600 text-gray-300',
  sizes: {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4'
  },
  colors: {
    default: {
      filled: 'bg-lime-600 hover:bg-lime-700',
      outline: 'border-lime-600',
      text: 'text-gray-300'
    }
  }
};

const customTheme: PartialReablocksTheme = {
  components: {
    button: buttonTheme,
    // other components themes
  }
};`
  },
  {
    key: 'wrap',
    title: 'Wrap your app',
    blurb: 'One provider. Components inherit instantly.',
    docHref:
      '/docs/theme/getting-started#integrating-reablocks-theme-in-your-application',
    docLabel: 'ThemeProvider docs',
    code: `import { ThemeProvider } from 'reablocks';
import { customTheme } from './theme';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={customTheme}>
      {children}
    </ThemeProvider>
  );
}`
  }
];

type StepState = 'pending' | 'active' | 'done';

const Marker: FC<{ state: StepState; num: number }> = ({ state, num }) => (
  <div
    aria-hidden="true"
    className={cn(
      'relative flex items-center justify-center w-9 h-9 rounded-full font-mono text-[13px] font-semibold transition-all duration-200 ease-[cubic-bezier(.2,.7,.2,1)]',
      'max-[640px]:w-7 max-[640px]:h-7 max-[640px]:text-[11px]',
      state === 'pending' &&
        'border border-rb-hairline-2 text-rb-fg-3 bg-rb-surface-1',
      state === 'active' &&
        'bg-blue-500 text-white scale-110 shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-blue-500)_22%,transparent)]',
      state === 'done' &&
        'bg-[color-mix(in_oklab,var(--color-rb-good)_18%,transparent)] border border-[color-mix(in_oklab,var(--color-rb-good)_45%,transparent)] text-rb-good'
    )}
  >
    {state === 'done' ? <Icon.check /> : num}
  </div>
);

const Pill: FC<{ tone: 'active' | 'done'; children: ReactNode }> = ({
  tone,
  children
}) => (
  <span
    className={cn(
      'inline-flex items-center px-2 py-[3px] rounded-full font-mono text-[10px] tracking-[0.08em] uppercase border whitespace-nowrap',
      tone === 'active' &&
        'bg-[color-mix(in_oklab,var(--color-blue-500)_15%,transparent)] text-blue-300 border-[color-mix(in_oklab,var(--color-blue-500)_35%,transparent)]',
      tone === 'done' &&
        'bg-[color-mix(in_oklab,var(--color-rb-good)_14%,transparent)] text-rb-good border-[color-mix(in_oklab,var(--color-rb-good)_35%,transparent)]'
    )}
  >
    {children}
  </span>
);

const getStepCode = (step: Step, tabIdx: number) => {
  if (step.tabs && step.tabs.length) {
    return step.tabs[Math.min(tabIdx, step.tabs.length - 1)].code;
  }
  return step.code ?? '';
};

export const Onboarding: FC = () => {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [justCopied, setJustCopied] = useState<string | null>(null);
  const [tabIdx, setTabIdx] = useState<Record<string, number>>({});

  const activeIdx = useMemo(() => {
    const idx = STEPS.findIndex((s) => !done.has(s.key));
    return idx === -1 ? STEPS.length : idx;
  }, [done]);

  const allDone = activeIdx === STEPS.length;

  const handleCopy = useCallback((step: Step, code: string) => {
    try {
      navigator.clipboard?.writeText(code);
    } catch {
      /* noop */
    }
    setDone((prev) => {
      const next = new Set(prev);
      next.add(step.key);
      return next;
    });
    setJustCopied(step.key);
    setTimeout(
      () => setJustCopied((k) => (k === step.key ? null : k)),
      1500
    );
  }, []);

  const reset = useCallback(() => {
    setDone(new Set());
    setJustCopied(null);
  }, []);

  return (
    <section className="py-24 max-[720px]:py-16 max-[640px]:py-12" id="onboarding">
      <div className="w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
        <SectionHead
          title="From install to render in four blocks."
          lede="No CSS bundler config. No theme provider gymnastics. Drop it in."
        />

        <div
          role="note"
          className="mb-5 flex items-start gap-3 px-4 py-3 rounded-[12px] border border-[color-mix(in_oklab,var(--color-blue-500)_30%,transparent)] bg-[color-mix(in_oklab,var(--color-blue-500)_8%,transparent)] max-[640px]:flex-col max-[640px]:gap-2"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[color-mix(in_oklab,var(--color-blue-500)_22%,transparent)] text-blue-300 shrink-0">
            <Icon.bolt />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white m-0 leading-[1.5]">
              <span className="font-semibold">Reablocks styles with Tailwind CSS.</span>{' '}
              <span className="text-rb-fg-2">
                Already on Tailwind v4? You&rsquo;re set — the steps below are
                all you need. Starting from scratch? Install Tailwind first
                and configure the Reablocks design tokens.
              </span>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href="/docs/getting-started/setup#2-installing-tailwind-css"
                className="inline-flex items-center gap-1 font-mono text-[11.5px] text-blue-300 hover:text-blue-200 no-underline"
              >
                Install Tailwind <Icon.arrowUpRight />
              </a>
              <a
                href="/docs/getting-started/setup#5-configure-reablocks-tokens-for-tailwind"
                className="inline-flex items-center gap-1 font-mono text-[11.5px] text-blue-300 hover:text-blue-200 no-underline"
              >
                Configure tokens <Icon.arrowUpRight />
              </a>
              <a
                href="https://tailwindcss.com/docs/installation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11.5px] text-rb-fg-3 hover:text-rb-fg-1 no-underline"
              >
                tailwindcss.com <Icon.arrowUpRight />
              </a>
            </div>
          </div>
        </div>

        <ol
          aria-label="Reablocks setup steps"
          className="rb-ring overflow-hidden rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_28px_-12px_rgba(0,0,0,0.6)] list-none m-0 p-0"
        >
          {STEPS.map((s, i) => {
            const isDone = done.has(s.key);
            const isActive = !isDone && i === activeIdx;
            const flashed = justCopied === s.key;
            const isFirst = i === 0;
            const isLast = i === STEPS.length - 1;
            const prevDone = i > 0 && done.has(STEPS[i - 1].key);
            const state: StepState = isDone
              ? 'done'
              : isActive
                ? 'active'
                : 'pending';
            const railOn =
              'bg-[color-mix(in_oklab,var(--color-rb-good)_55%,transparent)]';
            const railOff = 'bg-rb-hairline';
            const currentTab = tabIdx[s.key] ?? 0;
            const code = getStepCode(s, currentTab);

            return (
              <li
                key={s.key}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'relative grid grid-cols-[56px_minmax(0,1fr)] max-[640px]:grid-cols-[40px_minmax(0,1fr)] transition-colors duration-200',
                  !isLast && 'border-b border-rb-hairline',
                  isActive &&
                    'bg-[color-mix(in_oklab,var(--color-blue-500)_5%,transparent)]'
                )}
              >
                {/* Gutter: marker + continuous rail */}
                <div className="relative flex flex-col items-center pt-7 max-[640px]:pt-6">
                  {!isFirst && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute top-0 left-1/2 -translate-x-1/2 w-px h-7 max-[640px]:h-6 transition-colors duration-300',
                        prevDone ? railOn : railOff
                      )}
                    />
                  )}
                  <Marker state={state} num={i + 1} />
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex-1 w-px transition-colors duration-300',
                        isDone ? railOn : railOff
                      )}
                    />
                  )}
                </div>

                {/* Body */}
                <div className="py-6 pr-6 max-[640px]:pr-3 max-[640px]:py-5 min-w-0">
                  <div className="flex items-start gap-3 max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-rb-fg-3">
                          Step {i + 1} of {STEPS.length}
                        </span>
                        {isActive && <Pill tone="active">Next up</Pill>}
                        {isDone && <Pill tone="done">Done</Pill>}
                      </div>
                      <h3
                        className={cn(
                          'font-display text-[20px] font-semibold leading-tight text-white m-0 transition-opacity duration-200',
                          state === 'pending' && 'opacity-55'
                        )}
                      >
                        {s.title}
                      </h3>
                      <p
                        className={cn(
                          'text-sm text-rb-fg-2 leading-[1.55] mt-1.5 mb-0 transition-opacity duration-200',
                          state === 'pending' && 'opacity-55'
                        )}
                      >
                        {s.blurb}
                      </p>
                      <a
                        href={s.docHref}
                        className={cn(
                          'inline-flex items-center gap-1 mt-2 font-mono text-[11.5px] text-blue-300 hover:text-blue-200 no-underline transition-opacity duration-200',
                          state === 'pending' && 'opacity-55'
                        )}
                      >
                        {s.docLabel} <Icon.arrowUpRight />
                      </a>
                    </div>
                    <div className="shrink-0 max-[640px]:self-end">
                      <Button
                        variant={isActive ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => handleCopy(s, code)}
                        aria-label={`Copy code for ${s.title}`}
                      >
                        {flashed ? (
                          <Icon.check
                            style={{ color: 'var(--color-rb-good)' }}
                          />
                        ) : (
                          <Icon.copy />
                        )}
                        {flashed
                          ? 'Copied'
                          : isDone
                            ? 'Copy again'
                            : 'Copy'}
                      </Button>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'mt-3.5 rounded-[10px] border border-rb-hairline bg-[#0E0F1B] overflow-hidden transition-[opacity,filter] duration-200 min-w-0 max-w-full',
                      state === 'pending' && 'opacity-55 saturate-[0.6]',
                      state === 'done' && 'opacity-85'
                    )}
                  >
                    {s.tabs && s.tabs.length > 1 && (
                      <div
                        role="tablist"
                        aria-label={`${s.title} package manager`}
                        className="flex items-center gap-0.5 px-2 border-b border-rb-hairline bg-black/[0.18] overflow-x-auto"
                      >
                        {s.tabs.map((tab, idx) => {
                          const tabActive = currentTab === idx;
                          return (
                            <button
                              key={tab.label}
                              type="button"
                              role="tab"
                              aria-selected={tabActive}
                              onClick={() =>
                                setTabIdx((prev) => ({
                                  ...prev,
                                  [s.key]: idx
                                }))
                              }
                              className={cn(
                                'relative cursor-pointer font-mono text-[12px] px-3 py-2 transition-colors duration-150',
                                tabActive
                                  ? 'text-white'
                                  : 'text-rb-fg-3 hover:text-rb-fg-1'
                              )}
                            >
                              {tab.label}
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'absolute bottom-0 left-2.5 right-2.5 h-px rounded-sm transition-opacity duration-150',
                                  tabActive
                                    ? 'bg-blue-500 opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <CodeBlock code={code} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {allDone && (
          <div
            aria-live="polite"
            className="mt-4 flex items-center gap-3 px-5 py-4 rounded-[12px] border bg-[color-mix(in_oklab,var(--color-rb-good)_10%,transparent)] border-[color-mix(in_oklab,var(--color-rb-good)_30%,transparent)] max-[640px]:flex-wrap"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[color-mix(in_oklab,var(--color-rb-good)_22%,transparent)] text-rb-good shrink-0">
              <Icon.check />
            </span>
            <p className="text-sm font-medium text-white flex-1 m-0">
              You&rsquo;re wired up. Now render something unforgettable.
            </p>
            <Button variant="ghost" size="sm" onClick={reset}>
              Reset steps
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
