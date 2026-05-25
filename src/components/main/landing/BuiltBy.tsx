'use client';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { Icon, useInView } from './atoms';

const PILLARS: Array<{ title: string; copy: string }> = [
  {
    title: 'Design',
    copy: 'Sharp design that feels seamless to use. No templates, no shortcuts - every product is one-of-a-kind.'
  },
  {
    title: 'Build',
    copy: 'Rock-solid engineering, from pixels to production. Web, mobile, and AI-native software you can actually ship.'
  },
  {
    title: 'Deliver',
    copy: 'Move faster, launch sooner, scale smarter. We treat your goals like our own - and the work shows it.'
  }
];

const STATS: Array<{ value: string; label: string }> = [
  { value: '50+', label: 'Customers helped' },
  { value: '120+', label: 'Projects completed' },
  { value: '$325M+', label: 'Raised by clients' },
  { value: '4.7k+', label: 'Stars on open source' }
];

const GoodCodeMark: FC<{ className?: string }> = ({ className }) => (
  <Image
    src="https://avatars.githubusercontent.com/u/100522111?s=200&v=4"
    alt="Good Code"
    width={128}
    height={128}
    sizes="(max-width: 640px) 44px, 64px"
    className={cn('rounded-2xl object-cover', className)}
  />
);

export const BuiltBy: FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  const stars = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (i * 137.5) % 360;
        const radius = 12 + ((i * 7) % 38);
        const x = 50 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * radius;
        const delay = (i * 0.21) % 4.4;
        const size = 1 + (i % 3) * 0.4;
        return { x, y, delay, size };
      }),
    []
  );

  return (
    <section
      ref={ref}
      id="built-by"
      data-in={inView}
      className={cn(
        'relative isolate overflow-hidden py-28 max-[720px]:py-20 max-[640px]:py-14',
        'group/builtby'
      )}
    >
      {/* Backdrop ------------------------------------------------- */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* 56px grid, radial-masked */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)'
          }}
        />
        {/* Horizon glow */}
        <div
          className="absolute left-1/2 bottom-0 w-[1400px] h-[360px] -translate-x-1/2 translate-y-[40%] motion-safe:animate-rb-float"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(76,134,255,0.32), rgba(128,226,248,0.10) 45%, transparent 70%)'
          }}
        />
        {/* Stars */}
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/70 motion-safe:animate-rb-caret"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: '0 0 6px rgba(128,226,248,0.6)',
              animationDelay: `${s.delay}s`,
              animationDuration: '4.4s'
            }}
          />
        ))}
      </div>

      {/* Content -------------------------------------------------- */}
      <div className="relative z-[1] w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="flex flex-wrap items-center justify-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-rb-hairline-2 [backdrop-filter:blur(8px)]">
          <span className="relative inline-flex items-center justify-center w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-rb-good shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
            <span className="absolute inset-0 rounded-full bg-rb-good motion-safe:animate-rb-ping" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-rb-fg-2 leading-none whitespace-nowrap">
            {'// built by'}
          </span>
          <span className="w-px h-3 bg-rb-hairline-2 max-[480px]:hidden" />
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-rb-fg-3 leading-none whitespace-nowrap max-[480px]:hidden">
            est. 2020 · austin mcdaniel
          </span>
        </div>

        {/* Wordmark */}
        <div className="relative flex items-center justify-center gap-5 mt-10 max-[640px]:gap-3.5">
          <GoodCodeMark
            className={cn(
              'shrink-0 w-[64px] h-[64px] max-[640px]:w-11 max-[640px]:h-11 motion-safe:animate-rb-float',
              'drop-shadow-[0_0_18px_rgba(76,134,255,0.45)]'
            )}
          />
          <span
            className="font-semibold tracking-[-0.02em] text-[clamp(48px,9vw,88px)] max-[640px]:text-[clamp(36px,11vw,56px)] flex items-baseline gap-[0.08em]"
            style={{
              fontFamily: '"Chakra Petch", Lexend, sans-serif',
              lineHeight: 1
            }}
          >
            <em
              className="not-italic text-transparent bg-clip-text"
              style={{
                fontFamily: '"Chakra Petch", Lexend, sans-serif',
                fontStyle: 'italic',
                fontWeight: 600,
                lineHeight: 1,
                backgroundImage:
                  'linear-gradient(120deg, #FFFFFF 0%, #80E2F8 35%, #4C86FF 65%, #FFFFFF 100%)'
              }}
            >
              good
            </em>
            <span
              className="relative inline-block text-white"
              style={{
                fontFamily: '"Chakra Petch", Lexend, sans-serif',
                fontWeight: 600,
                lineHeight: 1
              }}
            >
              code
              <span
                aria-hidden="true"
                data-in={inView}
                className={cn(
                  'absolute left-0 right-0 -bottom-2 h-[3px] rounded-full origin-left scale-x-0',
                  'transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] delay-200',
                  'data-[in=true]:scale-x-100'
                )}
                style={{
                  background:
                    'linear-gradient(90deg, #4C86FF 0%, #80E2F8 60%, #FFFFFF 100%)'
                }}
              />
            </span>
          </span>
        </div>

        {/* Tagline */}
        <p
          className="mt-10 text-rb-fg-2 text-[clamp(20px,2.4vw,28px)] leading-[1.3] tracking-[0.01em] italic"
          style={{
            fontFamily: '"Chakra Petch", Lexend, sans-serif',
            fontWeight: 500
          }}
        >
          <span className="text-rb-fg-muted">“</span>
          Make Ship Happen.
          <span className="text-rb-fg-muted">”</span>
        </p>

        {/* Lede */}
        <p className="mt-5 max-w-[62ch] text-rb-fg-2 text-[16.5px] leading-[1.6] max-[640px]:text-[15px]">
          Reablocks is built and maintained by{' '}
          <a
            href="https://goodcode.us"
            target="_blank"
            rel="noreferrer"
            className="text-white no-underline border-b border-cyan-300/40 hover:border-cyan-300 transition-colors duration-150"
          >
            Good Code
          </a>
          {' '}- we blend sharp design with rock-solid engineering to help teams move faster, launch sooner, and scale smarter. We design and engineer digital products that feel seamless to use and solid under the hood.
        </p>

        {/* Pillars */}
        <ul className="list-none p-0 mt-12 grid grid-cols-3 gap-5 w-full max-w-[920px] text-left max-[720px]:gap-4 max-[560px]:grid-cols-1">
          {PILLARS.map((p, i) => (
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
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-rb-fg-3">
                  0{i + 1}
                </span>
                <span className="flex-1 h-px bg-rb-hairline-2" />
              </div>
              <h3 className="font-display text-[18px] font-semibold text-white tracking-[-0.01em] leading-none">
                {p.title}
              </h3>
              <p className="mt-2 text-rb-fg-3 text-[13.5px] leading-[1.55]">
                {p.copy}
              </p>
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="mt-10 w-full max-w-[920px] grid grid-cols-4 gap-4 max-[560px]:grid-cols-2">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-in={inView}
              className={cn(
                'rounded-xl px-4 py-4 bg-white/[0.02] border border-rb-hairline text-left',
                'opacity-0 translate-y-3 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)]',
                'data-[in=true]:opacity-100 data-[in=true]:translate-y-0'
              )}
              style={{ transitionDelay: `${(i + 3) * 80}ms` }}
            >
              <div className="font-display font-semibold text-white text-[26px] leading-none tracking-[-0.02em] bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[10.5px] tracking-[0.08em] uppercase text-rb-fg-3 leading-[1.4]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://goodcode.us"
            target="_blank"
            rel="noreferrer"
            className={cn(
              'relative inline-flex items-center gap-2 px-5 py-3 rounded-[10px] no-underline overflow-hidden',
              'bg-blue-500 border border-blue-500 text-white font-medium text-[14px]',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_-10px_rgba(16,94,255,0.7)]',
              'hover:bg-blue-400 hover:border-blue-400 transition-[background-color,border-color,transform] duration-150 active:translate-y-px'
            )}
          >
            <span>Visit goodcode.us</span>
            <Icon.arrowUpRight />
          </a>
          <a
            href="https://goodcode.us/contact"
            target="_blank"
            rel="noreferrer"
            className={cn(
              'inline-flex items-center gap-2 px-5 py-3 rounded-[10px] no-underline',
              'bg-white/[0.04] border border-rb-hairline-2 text-rb-fg-1 font-medium text-[14px]',
              'hover:bg-white/[0.08] hover:border-rb-hairline-strong transition-[background-color,border-color,transform] duration-150 active:translate-y-px'
            )}
          >
            <span>Start a project</span>
            <Icon.arrowRight />
          </a>
        </div>

        {/* Meta strip */}
        <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-rb-hairline">
          <span className="font-mono text-[11px] tracking-[0.06em] text-rb-fg-3 whitespace-nowrap">
            good design. good code. good results.
          </span>
          <span className="w-px h-3 bg-rb-hairline-2 max-[480px]:hidden" />
          <a
            href="https://goodcode.us"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] tracking-[0.06em] text-cyan-300 no-underline hover:text-white transition-colors duration-150 whitespace-nowrap"
          >
            goodcode.us
          </a>
          <span className="w-px h-3 bg-rb-hairline-2 max-[480px]:hidden" />
          <span className="font-mono text-[11px] tracking-[0.06em] text-rb-fg-muted whitespace-nowrap">
            © {new Date().getFullYear()} Good Code · Apache 2.0
          </span>
        </div>
      </div>
    </section>
  );
};
