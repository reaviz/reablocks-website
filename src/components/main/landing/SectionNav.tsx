'use client';

import { cn } from '@/utils/cn';
import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from './atoms';

const COLLAPSED_KEY = 'rb-rail-collapsed';

const SECTION_NAV_ITEMS = [
  { id: 'showcase', label: 'Build' },
  { id: 'playground', label: 'Playground' },
  { id: 'theme-studio', label: 'Theming' },
  { id: 'onboarding', label: 'Install' },
  { id: 'ai', label: 'AI-native' },
  { id: 'blocks', label: 'Blocks' },
  { id: 'unify', label: 'Unify' },
  { id: 'built-by', label: 'Good Code' }
];

export const SectionNav: FC = () => {
  const [active, setActive] = useState(SECTION_NAV_ITEMS[0].id);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    try {
      if (localStorage.getItem(COLLAPSED_KEY) === '1') setCollapsed(true);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [collapsed, hydrated]);

  useEffect(() => {
    const els = SECTION_NAV_ITEMS.map((it) => ({
      it,
      el: document.getElementById(it.id)
    })).filter((x): x is { it: typeof x.it; el: HTMLElement } => !!x.el);

    if (els.length === 0) return;

    const onScroll = () => {
      const first = els[0].el;
      const rect = first.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratiosRef.current.set(
            e.target.id,
            e.isIntersecting ? e.intersectionRatio : 0
          );
        });
        let bestId: string | null = null;
        let bestRatio = 0;
        ratiosRef.current.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        });
        if (bestRatio > 0 && bestId) setActive(bestId);
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    );
    els.forEach(({ el }) => io.observe(el));

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [open]);

  const onJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
    setOpen(false);
  };

  const activeIdx = Math.max(
    0,
    SECTION_NAV_ITEMS.findIndex((it) => it.id === active)
  );
  const current = SECTION_NAV_ITEMS[activeIdx];

  const navShown = visible && !collapsed;
  const pillShown = visible && collapsed;

  return (
    <>
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        aria-label="Show section navigation"
        data-shown={pillShown}
        className={cn(
          'fixed z-[55] right-6 bottom-6 opacity-0 pointer-events-none scale-90 translate-y-2 origin-bottom-right',
          'data-[shown=true]:opacity-100 data-[shown=true]:pointer-events-auto data-[shown=true]:scale-100 data-[shown=true]:translate-y-0',
          'transition-[opacity,transform,border-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]',
          'inline-flex items-center justify-center w-11 h-11 rounded-full cursor-pointer',
          'bg-[rgba(17,17,31,0.72)] border border-rb-hairline-2 text-rb-fg-1',
          '[backdrop-filter:blur(16px)_saturate(160%)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,255,255,0.02)]',
          'hover:border-rb-hairline-strong',
          'max-[1180px]:right-4.5 max-[1180px]:bottom-4.5',
          'max-[639px]:right-3 max-[639px]:bottom-3'
        )}
      >
        <Icon.chevron
          width={14}
          height={14}
          className="rotate-180"
        />
      </button>
      <nav
      data-shown={navShown}
      data-open={open}
      aria-label="Section navigation"
      className={cn(
        'fixed z-[55] right-6 bottom-6 opacity-0 pointer-events-none scale-95 translate-y-2 origin-bottom-right',
        'data-[shown=true]:opacity-100 data-[shown=true]:pointer-events-auto data-[shown=true]:scale-100 data-[shown=true]:translate-y-0',
        'transition-[opacity,transform] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]',
        // panel
        'px-4 py-3.5 pl-4.5 rounded-2xl bg-[rgba(17,17,31,0.45)] border border-rb-hairline-2 [backdrop-filter:blur(24px)_saturate(180%)] [-webkit-backdrop-filter:blur(24px)_saturate(180%)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,255,255,0.02)]',
        // tablet compact
        'max-[1180px]:right-4.5 max-[1180px]:bottom-4.5 max-[1180px]:p-3 max-[1180px]:rounded-xl',
        // mobile full-width
        'max-[639px]:right-3 max-[639px]:left-3 max-[639px]:bottom-3 max-[639px]:p-0 max-[639px]:rounded-2xl max-[639px]:bg-[rgba(11,11,20,0.86)]'
      )}
    >
      {/* Collapse to floating button */}
      <button
        type="button"
        onClick={() => setCollapsed(true)}
        aria-label="Collapse section navigation"
        className={cn(
          'absolute top-1.5 right-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full',
          'text-rb-fg-3 hover:text-rb-fg-1 hover:bg-white/[0.06] cursor-pointer transition-colors',
          'max-[639px]:hidden'
        )}
      >
        <Icon.chevron width={11} height={11} />
      </button>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="rb-rail-list"
        className="hidden max-[639px]:grid grid-cols-[auto_1fr_auto] items-center gap-3 w-full px-3.5 py-2.5 bg-transparent border-0 text-rb-fg-1 font-sans text-left cursor-pointer rounded-2xl"
      >
        <span className="min-w-0">
          <span className="text-sm font-medium text-rb-fg-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {current.label}
          </span>
        </span>
        <span aria-hidden="true" className="inline-flex items-center gap-1.5">
          {SECTION_NAV_ITEMS.map((it, i) => (
            <span
              key={it.id}
              className={cn(
                'w-[5px] h-[5px] rounded-full transition-[background-color,transform] duration-200',
                i === activeIdx &&
                  'bg-blue-400 scale-[1.35] shadow-[0_0_0_3px_rgba(16,94,255,0.18)]',
                i < activeIdx && 'bg-rb-fg-3',
                i > activeIdx && 'bg-rb-hairline-strong'
              )}
            />
          ))}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'text-rb-fg-3 transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)]',
            open && 'rotate-180'
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <ul
        id="rb-rail-list"
        className={cn(
          'list-none m-0 p-0 flex flex-col gap-0.5',
          // mobile collapsed accordion
          'max-[639px]:max-h-0 max-[639px]:overflow-hidden max-[639px]:px-2 max-[639px]:transition-[max-height,padding] max-[639px]:duration-300 max-[639px]:ease-[cubic-bezier(.2,.7,.2,1)]',
          open &&
            'max-[639px]:max-h-[360px] max-[639px]:py-2 max-[639px]:border-t max-[639px]:border-rb-hairline'
        )}
      >
        {SECTION_NAV_ITEMS.map((it) => {
          const isActive = it.id === active;
          return (
            <li
              key={it.id}
              className={cn('group', isActive && 'rb-rail-active')}
            >
              <a
                href={`#${it.id}`}
                onClick={(e) => onJump(e, it.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative grid grid-cols-[18px_auto] items-center gap-2.5 pr-1 py-1.5 no-underline text-[12.5px] leading-tight rounded-lg',
                  'transition-colors duration-150',
                  isActive ? 'text-rb-fg-1' : 'text-rb-fg-3 hover:text-rb-fg-1',
                  // tablet (compact)
                  'max-[1180px]:grid-cols-[16px] max-[1180px]:gap-2 max-[1180px]:py-1.5',
                  // mobile
                  'max-[639px]:grid-cols-[18px_auto] max-[639px]:gap-2.5 max-[639px]:py-2.5 max-[639px]:px-1.5 max-[639px]:text-sm max-[639px]:text-rb-fg-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative h-px justify-self-center transition-[width,background] duration-200 ease-[cubic-bezier(.2,.7,.2,1)]',
                    isActive
                      ? 'w-[18px] bg-gradient-to-r from-transparent to-blue-400'
                      : 'w-3.5 bg-rb-hairline-2 group-hover:bg-rb-hairline-strong',
                    // tick dot via ::after
                    'after:content-[""] after:absolute after:-right-[3px] after:top-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:transition-[background,transform,box-shadow] after:duration-200',
                    isActive
                      ? 'after:bg-blue-400 after:-translate-y-1/2 after:scale-[1.2] after:shadow-[0_0_0_3px_rgba(16,94,255,0.18),0_0_12px_rgba(59,123,255,0.6)]'
                      : 'after:bg-rb-fg-muted after:-translate-y-1/2 after:scale-[0.8] group-hover:after:bg-rb-fg-2 group-hover:after:scale-100',
                    // tablet narrower tick
                    'max-[1180px]:w-3',
                    'group-hover:[&:not(.is-active)]:w-3.5'
                  )}
                />
                <span
                  className={cn(
                    'whitespace-nowrap',
                    isActive && 'font-medium',
                    // tablet hides labels
                    'max-[1180px]:hidden max-[639px]:inline'
                  )}
                >
                  {it.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
    </>
  );
};
