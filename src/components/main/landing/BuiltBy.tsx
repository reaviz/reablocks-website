'use client';

import { cn } from '@/utils/cn';
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

const GoodCodeLogo: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 113 12"
    fill="url(#rb-goodcode-gradient)"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Good Code"
    className={className}
  >
    <defs>
      <linearGradient
        id="rb-goodcode-gradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#80E2F8" />
        <stop offset="65%" stopColor="#4C86FF" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
    <path d="M21.5973 0C24.8987 0 27.5751 2.68629 27.5751 6C27.5751 9.31371 24.8987 12 21.5973 12C18.2958 12 15.6195 9.31371 15.6195 6C15.6195 2.68629 18.2958 0 21.5973 0ZM21.5973 1.93548C19.3608 1.93548 17.5478 3.75523 17.5478 6C17.5478 8.24477 19.3608 10.0645 21.5973 10.0645C23.8337 10.0645 25.6468 8.24477 25.6468 6C25.6468 3.75523 23.8337 1.93548 21.5973 1.93548ZM37.2167 0C40.5182 0 43.1945 2.68629 43.1945 6C43.1945 9.31371 40.5182 12 37.2167 12C33.9153 12 31.2389 9.31371 31.2389 6C31.2389 2.68629 33.9153 0 37.2167 0ZM37.2167 1.93548C34.9803 1.93548 33.1672 3.75523 33.1672 6C33.1672 8.24477 34.9803 10.0645 37.2167 10.0645C39.4532 10.0645 41.2662 8.24477 41.2662 6C41.2662 3.75523 39.4532 1.93548 37.2167 1.93548ZM81.1826 0C84.4841 0 87.1604 2.68629 87.1604 6C87.1604 9.31371 84.4841 12 81.1826 12C77.8811 12 75.2048 9.31371 75.2048 6C75.2048 2.68629 77.8811 0 81.1826 0ZM81.1826 1.93548C78.9461 1.93548 77.1331 3.75523 77.1331 6C77.1331 8.24477 78.9461 10.0645 81.1826 10.0645C83.4191 10.0645 85.2321 8.24477 85.2321 6C85.2321 3.75523 83.4191 1.93548 81.1826 1.93548ZM66.5254 0C68.5669 0 70.4338 1.03682 71.53 2.72013L69.9166 3.77932C69.1728 2.63716 67.9093 1.93548 66.5254 1.93548C64.2896 1.93548 62.4772 3.75523 62.4772 6C62.4772 8.24477 64.2896 10.0645 66.5254 10.0645C67.9141 10.0645 69.1814 9.35792 69.924 8.20929L71.541 9.26306C70.4465 10.9559 68.574 12 66.5254 12C63.225 12 60.5495 9.31371 60.5495 6C60.5495 2.68629 63.225 0 66.5254 0ZM50.9079 0.193548C54.201 0.193548 56.8857 2.78451 56.8857 6C56.8857 9.21549 54.201 11.8065 50.9079 11.8065H46.8584V9.87097H50.9079C53.1526 9.87097 54.9573 8.1292 54.9573 6C54.9573 3.8708 53.1526 2.12903 50.9079 2.12903H46.8584V0.193548H50.9079ZM94.8737 0.193548C98.1669 0.193548 100.852 2.78451 100.852 6C100.852 9.21549 98.1669 11.8065 94.8737 11.8065H90.8242V9.87097H94.8737C97.1185 9.87097 98.9232 8.1292 98.9232 6C98.9232 3.8708 97.1185 2.12903 94.8737 2.12903H90.8242V0.193548H94.8737ZM5.97781 0C8.04602 0 9.93412 1.06352 11.0238 2.78195L9.39709 3.82122C8.65773 2.65529 7.37983 1.93548 5.97781 1.93548C3.74134 1.93548 1.92833 3.75523 1.92833 6C1.92833 8.24477 3.74134 10.0645 5.97781 10.0645C7.70445 10.0645 9.1787 8.9791 9.76112 7.45161H5.75646V5.51621H11.9363L11.9556 6C11.9556 9.31371 9.27927 12 5.97781 12C2.67636 12 0 9.31371 0 6C0 2.68629 2.67636 0 5.97781 0ZM104.515 2.12903H113V0.193548H104.515V2.12903ZM104.515 11.8065H113V9.87097H104.515V11.8065ZM104.515 6.96774H113V5.03226H104.515V6.96774Z" />
  </svg>
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
        'relative -top-6 isolate overflow-hidden py-24 max-[720px]:py-16 max-[640px]:py-12',
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
        {/* Dark-blue spotlight halo behind the signature */}
        <div
          className="absolute left-1/2 -top-6 w-[1100px] h-[600px] -translate-x-1/2 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 20%, rgba(30,80,220,0.22), transparent 70%)'
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
        <div className="relative flex flex-col items-center mt-10 max-[640px]:mt-8">
          <GoodCodeLogo
            className={cn(
              'block h-[clamp(40px,7vw,72px)] w-auto max-w-full motion-safe:animate-rb-float',
              'drop-shadow-[0_0_24px_rgba(76,134,255,0.45)]'
            )}
          />
          <span
            aria-hidden="true"
            data-in={inView}
            className={cn(
              'mt-4 h-[3px] w-[120px] max-[640px]:w-[88px] rounded-full origin-center scale-x-0',
              'transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] delay-200',
              'data-[in=true]:scale-x-100'
            )}
            style={{
              background:
                'linear-gradient(90deg, #4C86FF 0%, #80E2F8 60%, #FFFFFF 100%)'
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-10 text-rb-fg-2 text-[clamp(20px,2.4vw,28px)] leading-[1.3] tracking-[0.01em] italic"
          style={{
            fontFamily: 'Lexend, sans-serif',
            fontWeight: 500
          }}
        >
        </p>

        {/* Lede */}
        <p className="mt-5 max-w-[62ch] text-rb-fg-2 text-[16.5px] leading-[1.6] max-[640px]:text-[15px]">
          Reablocks is built and maintained by{' '}
          <a
            href="https://goodcode.us?utm_source=reablocks"
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
            href="https://goodcode.us?utm_source=reablocks"
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
            href="https://goodcode.us/contact?utm_source=reablocks"
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
          <span className="font-mono text-[11px] leading-[1.7] tracking-[0.06em] text-rb-fg-3 whitespace-nowrap">
            good design. good code. good results.
          </span>
          <span className="w-px h-3 bg-rb-hairline-2 max-[480px]:hidden" />
          <a
            href="https://goodcode.us?utm_source=reablocks"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] leading-[1.7] tracking-[0.06em] text-cyan-300 no-underline hover:text-white transition-colors duration-150 whitespace-nowrap"
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
