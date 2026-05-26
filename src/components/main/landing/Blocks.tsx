'use client';

import { cn } from '@/utils/cn';
import { CSSProperties, FC, ReactNode } from 'react';
import { Icon, SectionHead } from './atoms';

type Kind =
  // Authentication
  | 'forgot-password'
  | 'login'
  | 'mfa'
  | 'register'
  // Foundation
  | 'empty'
  | 'notfound'
  | 'chat'
  | 'timeline'
  // Administration
  | 'billing'
  | 'pricing'
  | 'profile'
  | 'team';

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

// Reablocks "R" mark used in auth previews.
const RMark: FC<{ size?: number }> = ({ size = 22 }) => (
  <span
    className="inline-flex items-center justify-center font-display font-bold text-blue-400"
    style={{ width: size, height: size, fontSize: size * 0.95, lineHeight: 1 }}
  >
    R
  </span>
);

const MiniPreview: FC<{ kind: Kind }> = ({ kind }) => {
  // ─── Authentication ────────────────────────────────────────────
  if (kind === 'login')
    return (
      <MpFrame className="items-center justify-center px-4">
        <MpWindow className="w-full max-w-[170px] p-3 text-center">
          <div className="mx-auto mb-1.5 flex items-center justify-center">
            <RMark size={18} />
          </div>
          <Bar w={60} h={2} className="mx-auto" />
          <Bar w={40} h={1} mt={1} className="mx-auto" />
          <div className="mt-2.5 h-3.5 rounded-[5px] border border-rb-hairline-2 bg-white/[0.03]" />
          <div
            className="mt-1.5 h-3.5 rounded-[5px] flex items-center justify-center"
            style={{ background: 'var(--color-blue-500)' }}
          >
            <span className="w-1.5 h-px bg-white/80" />
            <span className="ml-1 w-2 h-px bg-white/80" />
          </div>
          <div className="my-2 flex items-center gap-1">
            <span className="flex-1 h-px bg-rb-hairline-2" />
            <span className="flex-1 h-px bg-rb-hairline-2" />
          </div>
          <div className="h-3.5 rounded-[5px] border border-rb-hairline-2 bg-white/[0.02] flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="w-5 h-1 rounded bg-white/30" />
          </div>
          <div className="mt-1.5 flex justify-center gap-1">
            <span className="w-4 h-px bg-white/20" />
            <span className="w-3 h-px bg-blue-400/60" />
            <span className="w-3 h-px bg-white/20" />
            <span className="w-3 h-px bg-blue-400/60" />
          </div>
        </MpWindow>
      </MpFrame>
    );

  if (kind === 'forgot-password')
    return (
      <MpFrame className="items-center justify-center px-4">
        <MpWindow className="w-full max-w-[170px] p-3 text-center">
          <div className="mx-auto mb-1.5 flex items-center justify-center">
            <RMark size={18} />
          </div>
          <Bar w={60} h={2} className="mx-auto" />
          <Bar w={80} h={1} mt={1} className="mx-auto" />
          <Bar w={40} h={1} mt={1} className="mx-auto" />
          <div className="mt-2.5 h-3.5 rounded-[5px] border border-rb-hairline-2 bg-white/[0.03] flex items-center px-1.5">
            <span className="w-2 h-2 rounded-full border border-white/30" />
            <span className="ml-1 w-7 h-1 rounded bg-white/20" />
          </div>
          <div
            className="mt-1.5 h-3.5 rounded-[5px]"
            style={{ background: 'var(--color-blue-500)' }}
          />
          <div className="mt-2 inline-flex items-center justify-center gap-1 text-rb-fg-3">
            <span className="w-1 h-1 rounded-full bg-blue-300/70" />
            <span className="w-8 h-1 rounded bg-blue-300/60" />
          </div>
        </MpWindow>
      </MpFrame>
    );

  if (kind === 'register')
    return (
      <MpFrame className="items-center justify-center px-4">
        <MpWindow className="w-full max-w-[170px] p-3 text-center">
          <div className="mx-auto mb-1.5 flex items-center justify-center">
            <RMark size={18} />
          </div>
          <Bar w={60} h={2} className="mx-auto" />
          <Bar w={40} h={1} mt={1} className="mx-auto" />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="mt-1.5 h-3 rounded-[5px] border border-rb-hairline-2 bg-white/[0.03] flex items-center px-1.5"
            >
              <span className="w-7 h-1 rounded bg-white/20" />
            </div>
          ))}
          <div
            className="mt-2 h-3.5 rounded-[5px]"
            style={{ background: 'var(--color-blue-500)' }}
          />
        </MpWindow>
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

  // ─── Foundation ─────────────────────────────────────────────────
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

  if (kind === 'notfound')
    return (
      <MpFrame className="p-3">
        <div className="text-center">
          <div className="font-display font-bold text-white text-[15px] tracking-tight leading-tight">
            No Results
          </div>
          <Bar h={1} w={80} mt={1} className="mx-auto" />
        </div>
        <div className="flex flex-col gap-1.5 mt-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 border-b border-rb-hairline-2 pb-1.5 last:border-b-0"
            >
              <span className="w-3 h-3 rounded bg-white/[0.06] inline-flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-sm bg-gradient-to-br from-cyan-300 to-blue-400" />
              </span>
              <div className="flex-1">
                <Bar h={1} w={60} />
                <Bar h={1} w={40} mt={1} />
              </div>
              <span className="text-rb-fg-3 text-[8px]">›</span>
            </div>
          ))}
        </div>
      </MpFrame>
    );

  if (kind === 'chat')
    return (
      <MpFrame className="items-center justify-center px-3">
        <MpWindow className="w-full max-w-[190px] p-3">
          <div className="text-center">
            <div className="font-display font-bold text-white text-[12px] leading-tight tracking-tight">
              Report an issue
            </div>
            <Bar h={1} w={80} mt={1} className="mx-auto" />
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            <div>
              <Bar h={1} w={30} className="w-5" />
              <div className="mt-1 h-2.5 rounded-[3px] border border-rb-hairline-2 bg-white/[0.03]" />
            </div>
            <div>
              <Bar h={1} w={30} className="w-7" />
              <div className="mt-1 h-2.5 rounded-[3px] border border-rb-hairline-2 bg-white/[0.03]" />
            </div>
            <div>
              <Bar h={1} w={30} className="w-9" />
              <div className="mt-1 h-6 rounded-[3px] border border-rb-hairline-2 bg-white/[0.03]" />
            </div>
          </div>
          <div
            className="mt-2 h-3.5 rounded-[5px] flex items-center justify-center gap-1"
            style={{
              background:
                'linear-gradient(90deg, rgba(16,94,255,0.65), var(--color-blue-500))',
              boxShadow: '0 0 12px 0 rgba(16,94,255,0.45)'
            }}
          >
            <span className="w-7 h-1 rounded bg-white/70" />
            <span className="text-white/80 text-[7px] leading-none">→</span>
          </div>
        </MpWindow>
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

  // ─── Administration ─────────────────────────────────────────────
  if (kind === 'billing')
    return (
      <MpFrame className="p-3">
        <Bar w={30} h={2} />
        <Bar w={60} h={1} mt={1} />
        {/* Tabs row */}
        <div className="flex items-center gap-2 mt-2 border-b border-rb-hairline-2 pb-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              <Bar h={1} w={30} className={cn('w-5', i === 2 && 'bg-white/60')} />
              {i === 2 ? (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full"
                  style={{ background: 'var(--color-blue-500)' }}
                />
              ) : null}
            </div>
          ))}
        </div>
        {/* Plan + Billing period cards */}
        <Bar w={30} h={1} mt={3} />
        <div className="grid grid-cols-2 gap-1.5 mt-1.5">
          {[0, 1].map((i) => (
            <MpWindow key={i} className="p-1.5">
              <div className="flex items-center justify-between">
                <Bar h={1} w={60} />
                {i === 0 ? (
                  <span className="text-[6px] px-1 py-px rounded-full border border-rb-hairline-2 text-rb-fg-3">
                    Annual
                  </span>
                ) : null}
              </div>
              <Bar h={2} w={60} mt={1} />
              <div
                className="mt-1.5 h-2 rounded-sm"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
            </MpWindow>
          ))}
        </div>
        {/* Seats */}
        <Bar w={30} h={1} mt={3} />
        <div className="mt-1 h-2 rounded-full overflow-hidden bg-white/[0.06]">
          <div
            className="h-full w-[30%] rounded-full"
            style={{
              background:
                'linear-gradient(90deg, rgba(16,94,255,0.2), var(--color-blue-500))',
              boxShadow: '0 0 12px 0 rgba(16,94,255,0.6)'
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[8px] font-mono text-rb-fg-3">5/25</span>
          <Bar h={1} w={30} className="w-6" />
        </div>
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

  return null;
};

interface BlockEntry {
  kind: Kind;
  title: string;
  href: string;
}

interface CategoryGroup {
  id: 'authentication' | 'foundation' | 'administration';
  label: string;
  description: string;
  icon: ReactNode;
  blocks: BlockEntry[];
}

const CATEGORIES: CategoryGroup[] = [
  {
    id: 'authentication',
    label: 'Authentication',
    description: 'Sign-in, sign-up, recovery, and verification flows.',
    icon: <Icon.shield />,
    blocks: [
      {
        kind: 'forgot-password',
        title: 'Forgot Password',
        href: '/blocks/authentication/forgot-password'
      },
      { kind: 'login', title: 'Login', href: '/blocks/authentication/login' },
      { kind: 'mfa', title: 'MFA', href: '/blocks/authentication/mfa' },
      {
        kind: 'register',
        title: 'Register',
        href: '/blocks/authentication/register'
      }
    ]
  },
  {
    id: 'foundation',
    label: 'Foundation',
    description: 'Building-block screens every app reaches for.',
    icon: <Icon.layers />,
    blocks: [
      {
        kind: 'empty',
        title: 'Empty State',
        href: '/blocks/foundation/empty-state'
      },
      {
        kind: 'notfound',
        title: 'Not Found',
        href: '/blocks/foundation/not-found'
      },
      { kind: 'chat', title: 'Chat', href: '/blocks/foundation/contact' },
      {
        kind: 'timeline',
        title: 'Timeline',
        href: '/blocks/foundation/timeline'
      }
    ]
  },
  {
    id: 'administration',
    label: 'Administration',
    description: 'Settings, plans, members, and account surfaces.',
    icon: <Icon.settings />,
    blocks: [
      {
        kind: 'billing',
        title: 'Billing',
        href: '/blocks/administration/billing'
      },
      {
        kind: 'pricing',
        title: 'Pricing',
        href: '/blocks/administration/pricing'
      },
      {
        kind: 'profile',
        title: 'Profile',
        href: '/blocks/administration/profile'
      },
      { kind: 'team', title: 'Team', href: '/blocks/administration/team' }
    ]
  }
];

const CategoryHeader: FC<{ category: CategoryGroup }> = ({ category }) => (
  <div className="flex items-end justify-between gap-4 mb-5">
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/[0.12] border border-blue-500/[0.28] text-blue-300">
        {category.icon}
      </span>
      <div>
        <h3 className="font-display text-[22px] font-semibold tracking-[-0.01em] text-white leading-none">
          {category.label}
        </h3>
        <p className="text-rb-fg-3 text-[13px] mt-1.5 leading-none">
          {category.description}
        </p>
      </div>
    </div>
    <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-rb-fg-3">
      {category.blocks.length} blocks
    </span>
  </div>
);

const BlockCard: FC<{ block: BlockEntry; category: CategoryGroup }> = ({
  block,
  category
}) => (
  <a
    href={block.href}
    aria-label={`${block.title} block — ${category.label}`}
    className="rb-ring rb-ring--glow group no-underline text-inherit rounded-2xl overflow-hidden flex flex-col transition-[transform] duration-200 hover:-translate-y-0.5"
  >
    <div
      aria-hidden="true"
      className="aspect-[4/3] relative flex p-[18px] overflow-hidden bg-gradient-to-br from-rb-surface-1 to-rb-surface-2"
    >
      <MiniPreview kind={block.kind} />
    </div>
    <div className="flex items-center justify-between px-3.5 py-3 border-t border-rb-hairline">
      <div>
        <div className="text-sm font-semibold text-white">{block.title}</div>
        <div className="font-mono text-[10.5px] text-rb-fg-3 tracking-[0.06em] uppercase">
          {category.id}
        </div>
      </div>
      <span className="text-xs text-blue-300 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View block <Icon.arrowUpRight />
      </span>
    </div>
  </a>
);

export const Blocks: FC = () => (
  <section
    className="relative -top-6 py-24 max-[720px]:py-16 max-[640px]:py-12 overflow-hidden"
    id="blocks"
    aria-labelledby="blocks-heading"
  >
    {/* Fuchsia halo behind section — variety of pre-built blocks */}
    <div
      aria-hidden="true"
      className="absolute left-1/2 -top-6 w-[1100px] h-[600px] -translate-x-1/2 pointer-events-none z-0"
      style={{
        background:
          'radial-gradient(ellipse 50% 50% at 50% 20%, rgba(232,121,249,0.12), transparent 70%)'
      }}
    />
    <div className="relative z-[1] w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
      <SectionHead
        headingId="blocks-heading"
        title={
          <>
            Twelve{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              pre-built pages
            </span>{' '}
            across three categories.
          </>
        }
        lede="Not screenshots. Each block is a Reablocks composition you fork - same imports, same theming, organized into the surfaces you ship most."
      />
      <div className="flex flex-col gap-14">
        {CATEGORIES.map((category) => (
          <div key={category.id}>
            <CategoryHeader category={category} />
            <div className="grid grid-cols-4 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1 gap-[18px]">
              {category.blocks.map((block) => (
                <BlockCard
                  key={block.kind}
                  block={block}
                  category={category}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
