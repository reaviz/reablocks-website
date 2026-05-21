'use client';

import { cn } from '@/utils/cn';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { CodeBlock, CopyButton, SectionHead } from './atoms';

interface Step {
  key: string;
  label: string;
  blurb: string;
  code: string;
}

const STEPS: Step[] = [
  {
    key: 'install',
    label: '1. Install',
    blurb: 'One package, zero peer-dependency dance.',
    code: `# pnpm
pnpm add reablocks motion

# or npm
npm install reablocks motion`
  },
  {
    key: 'theme',
    label: '2. Theme',
    blurb: 'Extend the default theme — or paste one from Theming above.',
    code: `import { extendTheme, theme } from 'reablocks';

export const myTheme = extendTheme(theme, {
  colors: {
    primary: { DEFAULT: '#105EFF' },
  },
  radius: { DEFAULT: '10px' },
});`
  },
  {
    key: 'wrap',
    label: '3. Wrap your app',
    blurb: 'One provider. Components inherit instantly.',
    code: `import { ThemeProvider } from 'reablocks';
import { myTheme } from './theme';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={myTheme}>
      {children}
    </ThemeProvider>
  );
}`
  }
];

export const Onboarding: FC = () => {
  const [active, setActive] = useState('install');
  const step = STEPS.find((s) => s.key === active)!;

  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });
  useLayoutEffect(() => {
    const host = tabsRef.current;
    if (!host) return;
    const el = host.querySelector<HTMLElement>('[data-active="true"]');
    if (!el) return;
    const parent = host.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setIndicator({ x: r.left - parent.left, w: r.width });
  }, [active]);

  return (
    <section className="py-24 max-[720px]:py-16" id="onboarding">
      <div className="w-full max-w-[1240px] mx-auto px-7">
        <SectionHead
          title="From install to render in three blocks."
          lede="No CSS bundler config. No theme provider gymnastics. Drop it in."
        />

        <div className="rb-ring overflow-hidden rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_28px_-12px_rgba(0,0,0,0.6)]">
          <div
            className="relative flex items-center gap-1 px-3 py-2.5 border-b border-rb-hairline bg-black/[0.18]"
            ref={tabsRef}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-3 h-0.5 bg-blue-500 rounded-sm transition-[transform,width] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{
                transform: `translateX(${indicator.x}px)`,
                width: indicator.w
              }}
            />
            {STEPS.map((s) => (
              <button
                key={s.key}
                data-active={active === s.key}
                onClick={() => setActive(s.key)}
                className={cn(
                  'cursor-pointer font-sans text-[13.5px] px-3.5 py-2 rounded-md transition-colors duration-150',
                  active === s.key
                    ? 'text-white'
                    : 'text-rb-fg-3 hover:text-rb-fg-1'
                )}
              >
                {s.label}
              </button>
            ))}
            <div className="ml-auto flex gap-1.5 items-center">
              <CopyButton getText={() => step.code} />
            </div>
          </div>
          <div className="px-[22px] py-3.5 text-sm text-rb-fg-2">{step.blurb}</div>
          <div className="border-t border-rb-hairline bg-[#0E0F1B]">
            <CodeBlock code={step.code} />
          </div>
        </div>
      </div>
    </section>
  );
};
