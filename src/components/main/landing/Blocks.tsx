'use client';

import { cn } from '@/utils/cn';
import { CSSProperties, FC } from 'react';
import { Icon, SectionHead } from './atoms';

type Kind =
  | 'login'
  | 'pricing'
  | 'pricing-comparison'
  | 'pricing-toggle'
  | 'profile'
  | 'team'
  | 'billing'
  | 'timeline'
  | 'notfound'
  | 'support'
  | 'empty'
  | 'mfa';

// Mock-preview helpers ----------------------------------------------
const Bar: FC<{
  w?: 30 | 40 | 60 | 80;
  h?: 1 | 2 | 3;
  mt?: 1 | 2 | 3 | 4;
  className?: string;
  style?: CSSProperties;
}> = ({ w, h, mt, className, style }) => {
  const ws = { 30: 'w-[30%]', 40: 'w-[40%]', 60: 'w-[60%]', 80: 'w-[80%]' };
  const hs = { 1: 'h-1', 2: 'h-1.5', 3: 'h-2.5' };
  const mts = { 1: 'mt-1', 2: 'mt-1.5', 3: 'mt-2.5', 4: 'mt-3.5' };
  return (
    <div
      className={cn(
        'bg-white/[0.16] rounded opacity-70',
        w && ws[w],
        h && hs[h],
        mt && mts[mt],
        className
      )}
      style={style}
    />
  );
};

const MpFrame: FC<{
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}> = ({ className, style, children }) => (
  <div
    className={cn(
      'w-full h-full flex flex-col gap-1 bg-black/[0.18] rounded-lg overflow-hidden font-mono',
      className
    )}
    style={style}
  >
    {children}
  </div>
);

const MpWindow: FC<{
  hilite?: boolean;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}> = ({ hilite, className, style, children }) => (
  <div
    className={cn(
      'bg-white/[0.04] border rounded-lg',
      hilite
        ? 'border-blue-400 shadow-[0_0_0_1px_var(--color-blue-400)]'
        : 'border-rb-hairline-2',
      className
    )}
    style={style}
  >
    {children}
  </div>
);

const MiniPreview: FC<{ kind: Kind }> = ({ kind }) => {
  if (kind === 'login')
    return (
      <MpFrame className="items-center justify-center">
        <MpWindow className="w-[132px] p-3.5 text-center">
          <div
            className="w-[26px] h-[26px] rounded-lg mx-auto mb-2 bg-blue-500"
            style={{ background: 'var(--color-blue-500)' }}
          />
          <Bar w={40} h={2} />
          <Bar w={30} h={1} />
          <Bar w={60} h={3} mt={4} className="rounded-[5px]" />
          <Bar w={60} h={3} mt={2} className="rounded-[5px]" />
          <Bar
            w={60}
            h={3}
            mt={3}
            className="rounded-[5px]"
            style={{ background: 'var(--color-blue-500)', opacity: 1 }}
          />
        </MpWindow>
      </MpFrame>
    );

  if (kind === 'pricing')
    return (
      <MpFrame className="items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <MpWindow key={i} hilite={i === 1} className="w-[50px] p-2">
            <Bar w={30} h={1} />
            <Bar w={60} h={3} mt={2} />
            <Bar w={40} h={1} mt={2} />
            <Bar w={40} h={1} mt={1} />
            <Bar w={40} h={1} mt={1} />
            <Bar
              w={60}
              h={2}
              mt={3}
              className="rounded"
              style={{
                background:
                  i === 1 ? 'var(--color-blue-500)' : 'rgba(255,255,255,0.16)',
                opacity: 1
              }}
            />
          </MpWindow>
        ))}
      </MpFrame>
    );

  if (kind === 'pricing-comparison')
    return (
      <MpFrame className="p-3.5">
        <Bar w={40} h={2} />
        <div className="flex flex-col gap-1 mt-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Bar h={1} w={60} className="flex-[2]" />
              <span className="w-2.5 h-2.5 border border-white/20 rounded-full" />
              <span
                className={cn(
                  'w-2.5 h-2.5 rounded-full',
                  i % 2 === 0
                    ? 'bg-blue-500 border-0'
                    : 'border border-white/20'
                )}
              />
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
            </div>
          ))}
        </div>
      </MpFrame>
    );

  if (kind === 'pricing-toggle')
    return (
      <MpFrame className="p-3.5 items-center">
        <div className="inline-flex p-[3px] gap-0.5 bg-white/[0.06] rounded-full border border-rb-hairline-2 text-[10px]">
          <span className="px-2 py-0.5 rounded-full text-rb-fg-3">Monthly</span>
          <span
            className="px-2 py-0.5 rounded-full text-rb-bg-1"
            style={{ background: 'white', color: 'var(--color-rb-bg-1)' }}
          >
            Yearly
          </span>
        </div>
        <div className="flex gap-1.5 mt-2.5 justify-center">
          {[0, 1].map((i) => (
            <MpWindow key={i} className="w-[62px] p-2">
              <Bar w={30} h={1} />
              <Bar
                w={60}
                h={3}
                mt={2}
                style={{
                  background:
                    i === 1 ? 'var(--color-blue-500)' : 'rgba(255,255,255,0.16)',
                  opacity: 1,
                  borderRadius: 4
                }}
              />
              <Bar w={40} h={1} mt={2} />
              <Bar w={40} h={1} mt={1} />
            </MpWindow>
          ))}
        </div>
      </MpFrame>
    );

  if (kind === 'profile')
    return (
      <MpFrame>
        <div className="h-9 bg-gradient-to-br from-blue-500 to-cyan-400" />
        <div className="flex items-center gap-2 px-3.5 -mt-4">
          <span className="w-7 h-7 rounded-full bg-rb-surface-3 border-2 border-rb-surface-1" />
          <div className="flex-1">
            <Bar h={2} w={40} />
            <Bar h={1} w={30} mt={1} />
          </div>
          <span className="text-[9px] px-1.5 py-px bg-white/[0.08] rounded-full text-rb-fg-3">
            edit
          </span>
        </div>
        <div className="px-3.5 pt-3 grid gap-1.5">
          <Bar h={1} w={60} />
          <Bar h={1} w={40} />
        </div>
      </MpFrame>
    );

  if (kind === 'team')
    return (
      <MpFrame className="p-3.5">
        <Bar w={40} h={2} />
        <div className="flex flex-col gap-1.5 mt-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
              <Bar h={1} w={40} className="flex-1" />
              <span className="text-[9px] px-1.5 py-px bg-white/[0.08] rounded-full text-rb-fg-3">
                admin
              </span>
            </div>
          ))}
        </div>
      </MpFrame>
    );

  if (kind === 'billing')
    return (
      <MpFrame className="p-3.5 gap-2">
        <div className="flex justify-between">
          <Bar w={40} h={2} />
          <Bar
            w={30}
            h={2}
            style={{ background: 'var(--color-blue-500)', opacity: 1 }}
          />
        </div>
        <Bar w={60} h={1} mt={2} />
        <div className="flex flex-col gap-1 mt-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Bar h={1} w={40} className="flex-1" />
              <Bar h={1} w={30} />
            </div>
          ))}
        </div>
      </MpFrame>
    );

  if (kind === 'timeline')
    return (
      <MpFrame className="p-3.5">
        <Bar w={30} h={2} />
        <div className="relative mt-3.5">
          <span className="absolute left-1.5 top-1 bottom-1 w-px bg-rb-hairline-2" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  'w-[13px] h-[13px] rounded-full border-2 border-blue-400 shrink-0',
                  i === 0 ? 'bg-blue-500' : 'bg-rb-bg-1'
                )}
              />
              <div className="flex-1">
                <Bar h={1} w={60} />
                <Bar h={1} w={30} mt={1} />
              </div>
            </div>
          ))}
        </div>
      </MpFrame>
    );

  if (kind === 'notfound')
    return (
      <MpFrame className="items-center justify-center">
        <div
          className="font-display font-bold text-[44px] tracking-[-0.04em]"
          style={{
            background: 'linear-gradient(180deg,#fff,#3B7BFF)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          404
        </div>
        <Bar h={1} w={40} mt={2} />
        <Bar
          h={2}
          w={30}
          mt={3}
          className="rounded"
          style={{ background: 'var(--color-blue-500)', opacity: 1 }}
        />
      </MpFrame>
    );

  if (kind === 'support')
    return (
      <MpFrame className="p-3.5">
        <Bar w={40} h={2} />
        <div className="grid grid-cols-2 gap-1.5 mt-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <MpWindow key={i} className="p-2">
              <span className="inline-block w-4 h-4 rounded bg-gradient-to-br from-cyan-300 to-blue-400" />
              <Bar h={1} w={60} mt={2} />
              <Bar h={1} w={40} mt={1} />
            </MpWindow>
          ))}
        </div>
      </MpFrame>
    );

  if (kind === 'empty')
    return (
      <MpFrame className="items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-dashed border-rb-hairline-strong inline-flex items-center justify-center">
          <span className="w-5 h-5 rounded bg-gradient-to-br from-cyan-300 to-blue-400" />
        </div>
        <Bar h={2} w={40} mt={3} />
        <Bar h={1} w={60} mt={2} />
        <Bar
          h={2}
          w={30}
          mt={3}
          className="rounded"
          style={{ background: 'var(--color-blue-500)', opacity: 1 }}
        />
      </MpFrame>
    );

  if (kind === 'mfa')
    return (
      <MpFrame className="items-center justify-center">
        <MpWindow className="p-3.5 text-center w-40">
          <Bar h={2} w={40} className="mx-auto" />
          <Bar h={1} w={60} mt={1} className="mx-auto" />
          <div className="flex gap-1 justify-center mt-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="w-4 h-[22px] border border-rb-hairline-2 rounded inline-flex items-center justify-center text-xs bg-white/[0.02] text-blue-300"
              >
                {i < 3 ? '•' : ''}
              </span>
            ))}
          </div>
          <Bar
            h={2}
            w={60}
            mt={3}
            className="rounded mx-auto"
            style={{ background: 'var(--color-blue-500)', opacity: 1 }}
          />
        </MpWindow>
      </MpFrame>
    );

  return null;
};

interface BlockEntry {
  kind: Kind;
  title: string;
  tag: string;
}

const BLOCKS: BlockEntry[] = [
  { kind: 'login', title: 'Login', tag: 'auth' },
  { kind: 'pricing', title: 'Pricing · 3-tier', tag: 'marketing' },
  { kind: 'pricing-comparison', title: 'Pricing · Compare', tag: 'marketing' },
  { kind: 'pricing-toggle', title: 'Pricing · Toggle', tag: 'marketing' },
  { kind: 'profile', title: 'Profile', tag: 'app' },
  { kind: 'team', title: 'Team', tag: 'app' },
  { kind: 'billing', title: 'Billing', tag: 'app' },
  { kind: 'timeline', title: 'Timeline', tag: 'app' },
  { kind: 'notfound', title: 'NotFound', tag: 'errors' },
  { kind: 'support', title: 'Support', tag: 'app' },
  { kind: 'empty', title: 'EmptyState', tag: 'errors' },
  { kind: 'mfa', title: 'MFA', tag: 'auth' }
];

export const Blocks: FC = () => (
  <section className="py-24 max-[720px]:py-16" id="blocks">
    <div className="w-full max-w-[1240px] mx-auto px-7">
      <SectionHead
        title="Twelve pre-built pages, every one editable."
        lede="Not screenshots. Each block is a Reablocks composition you fork — same imports, same theming."
      />
    </div>
    <div className="w-full px-7">
      <div className="flex gap-[18px] overflow-x-auto pb-3 [scrollbar-width:thin] [scroll-snap-type:x_mandatory] [&>*]:scroll-snap-align-start">
        {BLOCKS.map((b) => (
          <a
            key={b.kind}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="rb-ring rb-ring--glow group flex-[0_0_280px] no-underline text-inherit rounded-2xl overflow-hidden flex flex-col transition-[transform] duration-200 hover:-translate-y-0.5"
          >
            <div className="aspect-[4/3] relative flex p-[18px] overflow-hidden bg-gradient-to-br from-rb-surface-1 to-rb-surface-2">
              <MiniPreview kind={b.kind} />
            </div>
            <div className="flex items-center justify-between px-3.5 py-3 border-t border-rb-hairline">
              <div>
                <div className="text-sm font-semibold text-white">{b.title}</div>
                <div className="font-mono text-[10.5px] text-rb-fg-3 tracking-[0.06em] uppercase">
                  {b.tag}
                </div>
              </div>
              <span className="text-xs text-blue-300 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View block <Icon.arrowUpRight />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
