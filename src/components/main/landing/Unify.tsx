'use client';

import { cn } from '@/utils/cn';
import { FC } from 'react';
import { Icon, SectionHead, useInView } from './atoms';

const UNIFY_SITE = 'https://unifydesignsystem.com';
const UNIFY_DOCS = '/docs/theme/theme-unify';
const UNIFY_PLUGIN =
  'https://www.figma.com/community/plugin/1374829984949878779';

const PILLARS: Array<{
  title: string;
  copy: string;
  icon: keyof typeof Icon;
}> = [
  {
    title: 'Tokens at every level',
    copy: 'Primitives, semantic aliases, and per-component detail tokens - change one variable, the whole system follows.',
    icon: 'layers'
  },
  {
    title: 'Tailwind-native, by default',
    copy: 'Every token registers as a Tailwind v4 utility. bg-background-brand-base, text-content-text-neutral-1, h-(--buttons-details-height-core-icon-lg) - no config, no glue.',
    icon: 'bolt'
  },
  {
    title: 'Reablocks, end-to-end',
    copy: 'Officially supported in Reablocks v10+. The Unify Theme maps every component slot onto Unify tokens - zero translation between design and code.',
    icon: 'packageBox'
  }
];

const PIPELINE: Array<{ label: string; sub: string; tone: string }> = [
  { label: 'Figma variables', sub: 'single source of truth', tone: 'figma' },
  { label: 'root · dark · light · tw', sub: 'CSS layers', tone: 'css' },
  { label: 'Tailwind v4 utilities', sub: '@theme inline', tone: 'tailwind' },
  { label: 'Reablocks components', sub: 'no code changes', tone: 'react' }
];

export const Unify: FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="unify"
      data-in={inView}
      aria-labelledby="unify-heading"
      className="relative -top-6 isolate overflow-hidden py-24 max-[720px]:py-16 max-[640px]:py-12"
    >
      {/* Backdrop ------------------------------------------------- */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Soft grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 80%)',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 80%)'
          }}
        />
        {/* Magenta/cyan brand halo */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -top-6 w-[1100px] h-[600px] -translate-x-1/2 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 20%, rgba(180,120,255,0.14), transparent 70%)'
          }}
        />
      </div>

      {/* Content -------------------------------------------------- */}
      <div className="relative z-[1] w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
        <SectionHead
          headingId="unify-heading"
          title={
            <>
              The design system Reablocks{' '}
              <span className="bg-gradient-to-r from-[#C18CFF] via-[#80E2F8] to-[#4C86FF] bg-clip-text text-transparent">
                speaks fluently
              </span>
              .
            </>
          }
          lede={
            <>
              <a
                href={UNIFY_SITE}
                target="_blank"
                rel="noreferrer"
                className="text-white no-underline border-b border-cyan-300/40 hover:border-cyan-300 transition-colors duration-150"
              >
                Unify
              </a>{' '}
              is a production-ready design system from Good Code — three-tier
              tokens, smart Figma components, and 30+ ready-to-ship blocks.
              Reablocks is the first React library to support it natively, with
              a dedicated theme pack and a Figma plugin that exports tokens
              straight into CSS variables and a preconfigured Tailwind setup.
            </>
          }
        />

        {/* Hero card --------------------------------------------- */}
        <div className="grid grid-cols-[1.05fr_1fr] gap-8 items-stretch max-[960px]:grid-cols-1 max-[960px]:gap-6">
          {/* Left — pipeline visualization */}
          <div
            className={cn(
              'rb-ring relative rounded-2xl p-7 max-[640px]:p-5 overflow-hidden',
              'bg-[radial-gradient(ellipse_120%_90%_at_0%_0%,rgba(192,144,255,0.10),transparent_60%),radial-gradient(ellipse_120%_90%_at_100%_100%,rgba(76,134,255,0.10),transparent_55%)]',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_28px_-12px_rgba(0,0,0,0.6)]'
            )}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.06] text-rb-fg-1 border border-rb-hairline-2">
                <Icon.layers width={12} height={12} />
              </span>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-rb-fg-3">
                token pipeline
              </span>
              <span className="flex-1 h-px bg-rb-hairline-2 ml-2" />
            </div>

            <ol className="list-none p-0 m-0 flex flex-col gap-2.5">
              {PIPELINE.map((p, i) => {
                const tones: Record<string, string> = {
                  figma:
                    'from-[rgba(192,144,255,0.22)] to-[rgba(192,144,255,0.04)] text-[#E0CCFF] border-[rgba(192,144,255,0.35)]',
                  css:
                    'from-[rgba(80,200,255,0.22)] to-[rgba(80,200,255,0.04)] text-[#BFEEFF] border-[rgba(80,200,255,0.35)]',
                  tailwind:
                    'from-[rgba(76,134,255,0.22)] to-[rgba(76,134,255,0.04)] text-[#CCDFFF] border-[rgba(76,134,255,0.35)]',
                  react:
                    'from-[rgba(74,222,128,0.20)] to-[rgba(74,222,128,0.04)] text-[#C6F5D7] border-[rgba(74,222,128,0.32)]'
                };
                return (
                  <li
                    key={p.label}
                    data-in={inView}
                    style={{ transitionDelay: `${i * 90}ms` }}
                    className={cn(
                      'grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3 px-3.5 py-2.5 rounded-xl border bg-gradient-to-r',
                      tones[p.tone],
                      'opacity-0 -translate-x-2 transition-[opacity,transform] duration-[500ms] ease-[cubic-bezier(.2,.7,.2,1)]',
                      'data-[in=true]:opacity-100 data-[in=true]:translate-x-0'
                    )}
                  >
                    <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-rb-fg-3">
                      0{i + 1}
                    </span>
                    <div className="flex items-baseline justify-between gap-3 min-w-0">
                      <span className="font-display font-medium text-[14.5px] leading-tight truncate">
                        {p.label}
                      </span>
                      <span className="font-mono text-[11px] text-rb-fg-3 whitespace-nowrap max-[480px]:hidden">
                        {p.sub}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-5 text-rb-fg-3 text-[13px] leading-[1.55]">
              One change in Figma flows down through{' '}
              <code className="font-mono text-rb-fg-2">root.css</code>,{' '}
              <code className="font-mono text-rb-fg-2">dark.css</code>,{' '}
              <code className="font-mono text-rb-fg-2">tw.css</code> and lands
              on every Reablocks component - no hand-translation.
            </p>
          </div>

          {/* Right — Figma plugin spotlight */}
          <div
            className={cn(
              'rb-ring relative rounded-2xl p-7 max-[640px]:p-5 flex flex-col',
              'bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0)_60%)]',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_28px_-12px_rgba(0,0,0,0.6)]'
            )}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.06] text-rb-fg-1 border border-rb-hairline-2">
                <Icon.bolt width={12} height={12} />
              </span>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-rb-fg-3">
                figma plugin
              </span>
              <span className="ml-auto inline-flex items-center px-2 py-[3px] rounded-full font-mono text-[10px] tracking-[0.08em] uppercase border whitespace-nowrap bg-[color-mix(in_oklab,var(--color-blue-500)_15%,transparent)] text-blue-300 border-[color-mix(in_oklab,var(--color-blue-500)_35%,transparent)]">
                Free · Figma Community
              </span>
            </div>

            <h3 className="font-display text-[22px] font-semibold text-white leading-tight tracking-[-0.01em] m-0">
              Export tokens. Ship CSS. Skip the glue.
            </h3>
            <p className="mt-2 text-rb-fg-2 text-[14.5px] leading-[1.6] mb-0">
              The Unify Figma plugin reads your design variables and emits a
              full token bundle:{' '}
              <code className="font-mono text-rb-fg-1">root.css</code>,{' '}
              <code className="font-mono text-rb-fg-1">dark.css</code>,{' '}
              <code className="font-mono text-rb-fg-1">light.css</code>, plus a
              preconfigured{' '}
              <code className="font-mono text-rb-fg-1">tw.css</code> that
              registers every token as a Tailwind v4 utility — ready to drop
              into your app.
            </p>

            <ul className="list-none p-0 mt-4 mb-0 flex flex-col gap-1.5">
              {[
                'CSS variables for primitives, semantic, and per-component detail',
                'Tailwind v4 @theme inline registration generated for you',
                'Light / dark modes — six selector aliases supported',
                'Re-run on every design-system bump — no hand edits'
              ].map((row) => (
                <li
                  key={row}
                  className="flex items-start gap-2 text-[13.5px] text-rb-fg-2 leading-[1.55]"
                >
                  <span className="mt-[3px] inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[color-mix(in_oklab,var(--color-rb-good)_18%,transparent)] text-rb-good shrink-0">
                    <Icon.check width={10} height={10} />
                  </span>
                  <span>{row}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={UNIFY_PLUGIN}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] no-underline',
                  'bg-blue-500 border border-blue-500 text-white font-medium text-[13.5px]',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_-10px_rgba(16,94,255,0.7)]',
                  'hover:bg-blue-400 hover:border-blue-400 transition-[background-color,border-color,transform] duration-150 active:translate-y-px'
                )}
              >
                <span>Get the Figma plugin</span>
                <Icon.arrowUpRight />
              </a>
              <a
                href={UNIFY_DOCS}
                className="inline-flex items-center gap-1.5 font-mono text-[12px] text-rb-fg-2 hover:text-white no-underline transition-colors duration-150"
              >
                Setup docs <Icon.arrowUpRight />
              </a>
            </div>
          </div>
        </div>

        {/* Pillars ----------------------------------------------- */}
        <ul className="list-none p-0 mt-10 grid grid-cols-3 gap-5 max-[720px]:gap-4 max-[720px]:grid-cols-1">
          {PILLARS.map((p, i) => {
            const Ic = Icon[p.icon];
            return (
              <li
                key={p.title}
                data-in={inView}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={cn(
                  'group/pillar relative rounded-2xl p-5 bg-white/[0.025] border border-rb-hairline-2',
                  'opacity-0 translate-y-3 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)]',
                  'data-[in=true]:opacity-100 data-[in=true]:translate-y-0',
                  'hover:border-rb-hairline-strong hover:bg-white/[0.04]'
                )}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/[0.05] text-rb-fg-1 border border-rb-hairline-2">
                    <Ic width={13} height={13} />
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-rb-fg-3">
                    0{i + 1}
                  </span>
                  <span className="flex-1 h-px bg-rb-hairline-2" />
                </div>
                <h3 className="font-display text-[17.5px] font-semibold text-white tracking-[-0.01em] leading-tight m-0">
                  {p.title}
                </h3>
                <p className="mt-2 mb-0 text-rb-fg-3 text-[13.5px] leading-[1.6]">
                  {p.copy}
                </p>
              </li>
            );
          })}
        </ul>

        {/* CTAs -------------------------------------------------- */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a
            href={UNIFY_DOCS}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-3 rounded-[10px] no-underline',
              'bg-blue-500 border border-blue-500 text-white font-medium text-[14px]',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_-10px_rgba(16,94,255,0.7)]',
              'hover:bg-blue-400 hover:border-blue-400 transition-[background-color,border-color,transform] duration-150 active:translate-y-px'
            )}
          >
            <span>Set up the Unify Theme</span>
            <Icon.arrowRight />
          </a>
          <a
            href={UNIFY_SITE}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'group/unify-cta relative inline-flex items-center gap-2 px-5 py-3 rounded-[10px] no-underline overflow-hidden',
              'text-[14px] font-medium text-rb-fg-1',
              'bg-[linear-gradient(135deg,rgba(192,144,255,0.10),rgba(80,200,255,0.06)_50%,rgba(76,134,255,0.10))]',
              'border border-[rgba(192,144,255,0.22)]',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_28px_-14px_rgba(192,144,255,0.45)]',
              'transition-[background,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(.2,.7,.2,1)]',
              'hover:border-[rgba(192,144,255,0.5)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_14px_36px_-12px_rgba(192,144,255,0.6)]',
              'active:translate-y-px'
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 group-hover/unify-cta:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(192,144,255,0.18), transparent 70%)'
              }}
            />
            <span className="relative text-rb-fg-2">Read more about</span>
            <span className="relative font-semibold tracking-[-0.005em] bg-[linear-gradient(120deg,#FFFFFF_0%,#C18CFF_25%,#80E2F8_55%,#4C86FF_80%,#FFFFFF_100%)] bg-clip-text text-transparent">
              Unify Design System
            </span>
            <Icon.arrowUpRight className="relative transition-transform duration-200 group-hover/unify-cta:translate-x-0.5 group-hover/unify-cta:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
