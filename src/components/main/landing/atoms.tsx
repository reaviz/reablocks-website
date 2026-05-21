'use client';

import { cn } from '@/utils/cn';
import {
  ButtonHTMLAttributes,
  CSSProperties,
  FC,
  ReactNode,
  SVGProps,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export const Icon = {
  arrowRight: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  arrowUpRight: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  ),
  github: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M12 .5C5.7.5.7 5.6.7 11.9c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6V21c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.4-2.3 1.1-3.2-.1-.3-.5-1.4.1-3 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.1.7.8 1.1 1.9 1.1 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.3 5.6 18.3.5 12 .5z" />
    </svg>
  ),
  search: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  chevron: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  chevronDown: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  copy: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M4 12l5 5L20 6" />
    </svg>
  ),
  x: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  ),
  bell: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  ),
  bolt: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  star: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M12 2l3.1 6.3 7 1L17 14.1l1.2 6.9L12 17.8 5.8 21 7 14.1 2 9.3l7-1z" />
    </svg>
  ),
  settings: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.4 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1A1.7 1.7 0 0 0 4.3 7.4l-.1-.1A2 2 0 1 1 7 4.5l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
  packageBox: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3.3 7L12 12l8.7-5M12 22V12" />
    </svg>
  ),
  layers: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 2l10 6-10 6L2 8l10-6zM2 16l10 6 10-6M2 12l10 6 10-6" />
    </svg>
  ),
  doc: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h4" />
    </svg>
  )
};

type BtnVariant = 'primary' | 'ghost' | 'outline';
type BtnSize = 'sm' | 'md' | 'lg';
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
}

const BTN_BASE =
  'inline-flex items-center gap-2 font-sans font-medium rounded-[10px] border border-transparent whitespace-nowrap cursor-pointer transition-[background-color,border-color,transform,box-shadow] duration-150 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed';

const BTN_SIZE: Record<BtnSize, string> = {
  sm: 'px-2.5 py-1.5 text-[13px]',
  md: 'px-3.5 py-2.5 text-sm',
  lg: 'px-5 py-3.5 text-[15px]'
};

const BTN_VARIANT: Record<BtnVariant, string> = {
  primary:
    'bg-blue-500 border-blue-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_-10px_rgba(16,94,255,0.7)] hover:bg-blue-400 hover:border-blue-400',
  ghost:
    'bg-white/[0.04] border-rb-hairline-2 text-rb-fg-1 hover:bg-white/[0.08] hover:border-rb-hairline-strong',
  outline:
    'bg-transparent border-rb-hairline-2 text-rb-fg-1 hover:border-rb-hairline-strong hover:text-white'
};

export function buttonClass(variant: BtnVariant = 'primary', size: BtnSize = 'md') {
  return cn(BTN_BASE, BTN_SIZE[size], BTN_VARIANT[variant]);
}

export const Button: FC<BtnProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) => (
  <button className={cn(buttonClass(variant, size), className)} {...rest}>
    {children}
  </button>
);

// Lightweight syntax highlighter for code blocks.
export function highlight(code: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tokens: string[] = [];
  // Word-character sentinels prevent the number / type regex passes below
  // from matching digits *inside* placeholders (no \b boundary between
  // letters and digits, so \b\d+\b can't bite through `_PH_12_PH_`).
  const ph = (val: string) => {
    tokens.push(val);
    return `_PH_${tokens.length - 1}_PH_`;
  };
  let s = code;
  s = s.replace(/\/\*[\s\S]*?\*\//g, (m) =>
    ph(`<span class="hl-c">${escape(m)}</span>`)
  );
  s = s.replace(/\/\/[^\n]*/g, (m) => ph(`<span class="hl-c">${escape(m)}</span>`));
  s = s.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, (m) =>
    ph(`<span class="hl-s">${escape(m)}</span>`)
  );
  s = s.replace(
    /\b(import|from|export|const|let|var|function|return|if|else|for|of|in|new|async|await|default|as|type|interface)\b/g,
    (m) => ph(`<span class="hl-k">${m}</span>`)
  );
  s = s.replace(/\b([A-Z][A-Za-z0-9]*)\b/g, (m) =>
    ph(`<span class="hl-t">${m}</span>`)
  );
  s = s.replace(/\b(true|false|null|undefined)\b/g, (m) =>
    ph(`<span class="hl-b">${m}</span>`)
  );
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, (m) =>
    ph(`<span class="hl-n">${m}</span>`)
  );
  s = escape(s);
  s = s.replace(/_PH_(\d+)_PH_/g, (_m, i) => tokens[Number(i)]);
  return s;
}

export const CodeBlock: FC<{ code: string; className?: string }> = ({
  code,
  className
}) => {
  const html = useMemo(() => highlight(code), [code]);
  return (
    <pre
      className={cn(
        'm-0 px-5 py-[18px] font-mono text-[13px] leading-[1.65] text-rb-fg-1 overflow-auto whitespace-pre bg-transparent !rounded-t-none',
        className
      )}
    >
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};

export const CopyButton: FC<{
  getText: string | (() => string);
  label?: string;
}> = ({ getText, label = 'Copy' }) => {
  const [done, setDone] = useState(false);
  const onClick = () => {
    try {
      const txt = typeof getText === 'function' ? getText() : getText;
      navigator.clipboard?.writeText(txt);
    } catch {
      /* noop */
    }
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  };
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      {done ? (
        <Icon.check style={{ color: 'var(--color-rb-good)' }} />
      ) : (
        <Icon.copy />
      )}
      {done ? 'Copied' : label}
    </Button>
  );
};

export function useInView<T extends HTMLElement = HTMLElement>(
  opts: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      });
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);
  return [ref, seen] as const;
}

export const SectionRule: FC<{
  title: string;
  num: string;
  total?: string;
  className?: string;
}> = ({ title, num, total = '06', className }) => (
  <div
    aria-hidden="true"
    className={cn(
      'flex items-center gap-3.5 w-full max-w-[1240px] mx-auto px-7 py-3.5',
      className
    )}
  >
    <span className="flex-1 h-px bg-[linear-gradient(90deg,transparent,var(--color-rb-hairline-2),transparent)]" />
    <span className="inline-flex items-center gap-2.5 font-display text-[13px] font-medium text-rb-fg-2 leading-[1.55] tracking-[2.6px] uppercase whitespace-nowrap">
      <span>{title}</span>
      <span className="text-rb-fg-muted">·</span>
      <span>{num}</span>
      <span className="text-rb-fg-muted">/ {total}</span>
    </span>
    <span className="flex-1 h-px bg-[linear-gradient(90deg,transparent,var(--color-rb-hairline-2),transparent)]" />
  </div>
);

export const Eyebrow: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 font-mono text-xs tracking-[0.04em] text-cyan-300 lowercase before:content-[''] before:w-[18px] before:h-px before:bg-cyan-300 before:opacity-70",
      className
    )}
  >
    {children}
  </span>
);

export const SectionHead: FC<{
  eyebrow?: ReactNode;
  title?: ReactNode;
  lede?: ReactNode;
  align?: 'center';
  children?: ReactNode;
}> = ({ eyebrow, title, lede, align, children }) => (
  <div
    className={cn(
      'mb-12',
      align === 'center' && 'text-center mx-auto'
    )}
  >
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    {title ? (
      <h2 className="font-display font-semibold text-[clamp(36px,4.6vw,60px)] leading-[1.05] tracking-[-0.025em] my-4 text-white">
        {title}
      </h2>
    ) : null}
    {lede ? (
      <p className="text-rb-fg-2 text-[17px] leading-[1.55] max-w-[64ch] m-0">
        {lede}
      </p>
    ) : null}
    {children}
  </div>
);

export function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const cb = () => setMatch(mq.matches);
    cb();
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, [query]);
  return match;
}

// CSSProperties helper allowing CSS custom properties.
export type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>;
