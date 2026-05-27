'use client';

import { cn } from '@/utils/cn';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Button, CodeBlock, CopyButton, Icon, SectionHead } from './atoms';
import { InstallTerminal } from '@/components/ui/install-terminal';

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
      { label: 'npm', code: 'npm install reablocks' },
      { label: 'pnpm', code: 'pnpm add reablocks' },
      { label: 'yarn', code: 'yarn add reablocks' },
      { label: 'bun', code: 'bun add reablocks' }
    ]
  },
  {
    key: 'styles',
    title: 'Import styles',
    blurb: 'Import the prebuilt stylesheet in your app entry (e.g. main.tsx) — no Tailwind setup required. Want to customize tokens? Follow the Tailwind setup below.',
    docHref: '/docs/getting-started/setup#3-import-tailwind-in-your-css',
    docLabel: 'Tailwind setup',
    code: `import "reablocks/index.css";`
  },
  {
    key: 'theme',
    title: 'Pick a default theme',
    blurb:
      'Set the default theme by adding theme-dark or theme-light className to your root html tag. Flip between them to toggle the whole UI.',
    docHref: '/docs/theme/getting-started#switching-themes',
    docLabel: 'Switching themes',
    code: `<html className="theme-dark">
  {/* or className="theme-light" */}
  ...
</html>`
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

const CLI_CMD = 'npx reablocks-cli@latest init';

const CLI_BULLETS: { text: ReactNode }[] = [
  {
    text: (
      <>
        Auto-detects framework —{' '}
        <em className="not-italic text-rb-fg-2">
          React Router, Vite, Next.js, Remix
        </em>
      </>
    )
  },
  {
    text: (
      <>
        Installs <em className="not-italic text-rb-fg-2">reablocks</em> +{' '}
        <em className="not-italic text-rb-fg-2">tailwindcss</em> with v4 tokens
        preconfigured
      </>
    )
  },
  {
    text: (
      <>
        Wraps{' '}
        <em className="not-italic text-blue-300 font-medium">
          &lt;ThemeProvider /&gt;
        </em>{' '}
        for you — every edit is preview-then-confirm
      </>
    )
  },
  { text: 'Idempotent — safe to re-run on a half-configured project' }
];

const CliPanel: FC = () => (
  <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start max-[980px]:grid-cols-1 max-[980px]:gap-9">
    <div>
      <div className="relative max-w-[460px] w-full bg-white/[0.03] rb-ring-overlay rounded-xl [backdrop-filter:blur(8px)]">
        <div className="flex items-center gap-0.5 p-1 border-b border-rb-hairline bg-transparent relative z-[1]">
          <span className="font-mono text-xs px-3.5 py-1.5 rounded-md bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_var(--color-rb-hairline-2)]">
            run once, set everything up
          </span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2.5 pl-3.5 relative z-[1]">
          <span className="font-mono text-[13.5px] text-cyan-400 select-none">
            $
          </span>
          <code className="font-mono text-[13.5px] inline-flex items-baseline whitespace-nowrap">
            <span className="text-white font-medium">npx</span>
            <span className="text-rb-fg-3">
              &nbsp;reablocks-cli@latest&nbsp;
            </span>
            <span className="text-cyan-300">init</span>
          </code>
          <span className="ml-auto">
            <CopyButton getText={() => CLI_CMD} />
          </span>
        </div>
      </div>

      <ul className="list-none p-0 mt-6 grid gap-2.5">
        {CLI_BULLETS.map((item, i) => (
          <li
            key={i}
            className="flex gap-2.5 items-start text-rb-fg-2 text-sm leading-[1.5]"
          >
            <span className="w-[18px] h-[18px] rounded-full bg-[rgba(74,222,128,0.18)] text-rb-good inline-flex items-center justify-center shrink-0 mt-px">
              <Icon.check />
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>

    <InstallTerminal />
  </div>
);

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
  const [installMode, setInstallMode] = useState<'cli' | 'manual'>('cli');
  const [justCopied, setJustCopied] = useState<string | null>(null);
  const [tabIdx, setTabIdx] = useState<Record<string, number>>({});
  const [states, setStates] = useState<StepState[]>(() =>
    STEPS.map(() => 'pending')
  );
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const compute = () => {
      const targetY = window.innerHeight * 0.45;
      const next: StepState[] = STEPS.map((_, idx) => {
        const el = stepRefs.current[idx];
        if (!el) return 'pending';
        const rect = el.getBoundingClientRect();
        if (rect.bottom < targetY) return 'done';
        if (rect.top < targetY) return 'active';
        return 'pending';
      });
      setStates((prev) =>
        prev.length === next.length && prev.every((s, i) => s === next[i])
          ? prev
          : next
      );
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleCopy = useCallback((step: Step, code: string) => {
    try {
      navigator.clipboard?.writeText(code);
    } catch {
      /* noop */
    }
    setJustCopied(step.key);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setJustCopied((k) => (k === step.key ? null : k));
      copyTimerRef.current = null;
    }, 1500);
  }, []);

  return (
    <section
      className="relative -top-6 py-24 max-[720px]:py-16 max-[640px]:py-12 overflow-hidden"
      id="onboarding"
      aria-labelledby="onboarding-heading"
    >
      {/* Amber halo behind section — warm welcome / install */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-6 w-[1100px] h-[600px] -translate-x-1/2 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 20%, rgba(251,191,36,0.10), transparent 70%)'
        }}
      />
      <div className="relative z-[1] w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
        <SectionHead
          headingId="onboarding-heading"
          title={
            <>
              From install to render in{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                four blocks
              </span>
              .
            </>
          }
          lede="Built on Tailwind CSS v4. Install the package, wire up the styles, define your theme tokens, and wrap your app in ThemeProvider."
        />

        <div
          role="tablist"
          aria-label="Choose installation method"
          className="mb-6 inline-flex items-center gap-1 p-1 rounded-full border border-rb-hairline-2 bg-rb-surface-1"
        >
          {(
            [
              { key: 'cli', label: 'CLI' },
              { key: 'manual', label: 'Manual' }
            ] as const
          ).map(({ key, label }) => {
            const active = installMode === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setInstallMode(key)}
                className={cn(
                  'cursor-pointer px-4 py-1.5 rounded-full font-mono text-[12.5px] transition-colors',
                  active
                    ? 'bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_var(--color-rb-hairline-2)]'
                    : 'text-rb-fg-3 hover:text-rb-fg-1'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {installMode === 'cli' ? (
          <CliPanel />
        ) : (
          <>
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
            const state = states[i] ?? 'pending';
            const isDone = state === 'done';
            const isActive = state === 'active';
            const flashed = justCopied === s.key;
            const isFirst = i === 0;
            const isLast = i === STEPS.length - 1;
            const prevDone = i > 0 && states[i - 1] === 'done';
            const railOn =
              'bg-[color-mix(in_oklab,var(--color-rb-good)_55%,transparent)]';
            const railOff = 'bg-rb-hairline';
            const currentTab = tabIdx[s.key] ?? 0;
            const code = getStepCode(s, currentTab);

            return (
              <li
                key={s.key}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
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
          </>
        )}

      </div>
    </section>
  );
};
