'use client';

import { cn } from '@/utils/cn';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live-runner';
import * as Reablocks from 'reablocks';
import * as React from 'react';
import { ThemeProvider, theme } from 'reablocks';
import { CopyButton, SectionHead } from './atoms';

interface Example {
  label: string;
  code: string;
}

const EXAMPLES: Record<string, Example> = {
  buttons: {
    label: 'Button variants',
    code: `import { Button } from 'reablocks';

render(
  <div className="light:bg-white p-24 flex gap-2">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="success">Success</Button>
    <Button color="warning">Warning</Button>
    <Button color="error">Error</Button>
  </div>
);`
  },
  form: {
    label: 'Form',
    code: `import { Card, Input, Select, Button } from 'reablocks';

render(
  <Card className="p-5">
    <Input label="Email" type="email" placeholder="you@company.com" />
    <Select label="Role" options={['Developer','Designer','PM']} />
    <Button color="primary" fullWidth>Continue</Button>
  </Card>
);`
  }
};

const liveScope = {
  import: {
    reablocks: Reablocks,
    react: React
  }
};

const MIN_PANEL_PCT = 20;
const MAX_PANEL_PCT = 80;

export const Playground: FC = () => {
  const tabs = Object.keys(EXAMPLES);
  const [active, setActive] = useState<keyof typeof EXAMPLES>('buttons');
  const example = EXAMPLES[active];

  const splitRef = useRef<HTMLDivElement>(null);
  const [editorPct, setEditorPct] = useState(40);
  const [dragging, setDragging] = useState(false);

  const onDragStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const el = splitRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setEditorPct(Math.min(MAX_PANEL_PCT, Math.max(MIN_PANEL_PCT, pct)));
    };
    const onUp = () => setDragging(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    const prevUserSelect = document.body.style.userSelect;
    const prevCursor = document.body.style.cursor;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.body.style.userSelect = prevUserSelect;
      document.body.style.cursor = prevCursor;
    };
  }, [dragging]);

  return (
    <section className="py-24 max-[720px]:py-16" id="playground">
      <div className="w-full max-w-[1240px] mx-auto px-7">
        <SectionHead
          title="Edit live. See the result. Copy the snippet."
          lede="A real react-live-runner instance with starter examples. Same APIs you'd use in production."
        />
        <ThemeProvider theme={theme}>
          <LiveProvider key={active} code={example.code} scope={liveScope}>
            <div className="rb-ring rounded-[22px] overflow-hidden">
              <div className="flex items-center gap-1 px-2.5 py-2 border-b border-rb-hairline bg-black/[0.18]">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={cn(
                      'cursor-pointer font-sans text-[13px] px-3 py-1.5 rounded-md',
                      active === t
                        ? 'bg-white/[0.05] text-white shadow-[inset_0_0_0_1px_var(--color-rb-hairline-2)]'
                        : 'bg-transparent text-rb-fg-3 hover:text-white'
                    )}
                  >
                    {EXAMPLES[t].label}
                  </button>
                ))}
                <div className="ml-auto flex gap-1.5">
                  <CopyButton getText={() => example.code} />
                </div>
              </div>
              <div
                ref={splitRef}
                className="flex min-h-[360px] max-[880px]:flex-col"
              >
                <div
                  className="flex flex-col bg-[#0E0F1B] min-h-[320px] max-[880px]:!w-full max-[880px]:border-b max-[880px]:border-rb-hairline"
                  style={{ width: `${editorPct}%` }}
                >
                  <div className="px-3.5 py-2 border-b border-rb-hairline flex items-center text-xs text-rb-fg-3 font-mono">
                    <span>{active}.tsx</span>
                  </div>
                  <div className="flex-1 overflow-auto bg-[#0E0F1B]">
                    <LiveEditor
                      className="font-mono text-sm !bg-[#0E0F1B] [&_pre]:!whitespace-pre [&_pre]:!break-normal [&_textarea]:!whitespace-pre [&_textarea]:!break-normal"
                      style={{ minWidth: 'max-content', minHeight: '100%' }}
                    />
                  </div>
                </div>
                <div
                  role="separator"
                  aria-orientation="vertical"
                  aria-valuenow={Math.round(editorPct)}
                  aria-valuemin={MIN_PANEL_PCT}
                  aria-valuemax={MAX_PANEL_PCT}
                  onPointerDown={onDragStart}
                  className={cn(
                    'group relative w-px shrink-0 bg-rb-hairline cursor-col-resize hover:bg-rb-hairline-2 transition-colors max-[880px]:hidden',
                    dragging && 'bg-blue-400'
                  )}
                >
                  <span className="absolute inset-y-0 -left-1.5 -right-1.5" />
                  <span
                    className={cn(
                      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-1 rounded-full bg-rb-hairline-2 group-hover:bg-rb-fg-3 transition-colors',
                      dragging && 'bg-blue-400'
                    )}
                  />
                </div>
                <div
                  className="flex flex-col max-[880px]:!w-full"
                  style={{ width: `${100 - editorPct}%` }}
                >
                  <div className="px-3.5 py-2 border-b border-rb-hairline flex items-center text-xs text-rb-fg-3 font-mono">
                    <span>preview · ThemeProvider</span>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/[0.05] border border-rb-hairline text-rb-fg-2 rounded-full">
                      live
                    </span>
                  </div>
                  <div
                    className="flex-1 overflow-auto"
                    style={{
                      background:
                        'radial-gradient(circle at 12px 12px, rgba(255,255,255,0.04) 1px, transparent 1.5px) 0 0/24px 24px, linear-gradient(180deg, rgba(0,0,0,0.18), transparent)'
                    }}
                  >
                    <div
                      className="min-h-full p-[26px] flex items-center justify-center"
                      style={{ minWidth: 'max-content' }}
                    >
                      <LivePreview />
                    </div>
                  </div>
                  <LiveError className="text-xs font-mono text-red-400 px-3.5 py-2 border-t border-rb-hairline bg-red-950/30" />
                </div>
              </div>
            </div>
          </LiveProvider>
        </ThemeProvider>
      </div>
    </section>
  );
};
