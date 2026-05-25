'use client';

import { cn } from '@/utils/cn';
import {
  CSSProperties,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { DateFormat } from 'reablocks';
import { ReablocksRelease } from '@/utils/reablocks-version';
import { Button, CSSVarStyle, Icon, useMediaQuery } from './atoms';

const CATEGORIES = {
  elements: '#3B7BFF',
  form: '#00C5F0',
  layers: '#A78BFA',
  layout: '#34D399',
  data: '#FBBF24',
  motion: '#FB7185'
} as const;

type Category = keyof typeof CATEGORIES;

interface Node {
  id: string;
  cat: Category;
  x: number;
  y: number;
  docs: string;
}

const NODES: Node[] = [
  { id: 'Button', cat: 'elements', x: 80, y: 30, docs: '/docs/components/elements/button' },
  { id: 'IconButton', cat: 'elements', x: 92, y: 23, docs: '/docs/components/elements/icon-button' },
  { id: 'Tooltip', cat: 'layers', x: 32, y: 24, docs: '/docs/components/layers/tooltip' },
  { id: 'Popover', cat: 'layers', x: 19, y: 18, docs: '/docs/components/layers/popover' },
  { id: 'Stepper', cat: 'layout', x: 11, y: 24, docs: '/docs/components/layout/stepper' },
  { id: 'Calendar', cat: 'form', x: 66, y: 23, docs: '/docs/components/form/calendar' },
  { id: 'Tabs', cat: 'layout', x: 17, y: 33, docs: '/docs/components/layout/tabs' },
  { id: 'CommandPalette', cat: 'data', x: 7, y: 50, docs: '/docs/components/data/command-palette' },
  { id: 'Dialog', cat: 'layers', x: 93, y: 38, docs: '/docs/components/layers/dialog' },
  { id: 'ConfirmDialog', cat: 'layers', x: 89, y: 52, docs: '/docs/components/layers/confirm-dialog' },
  { id: 'DateInput', cat: 'form', x: 81, y: 87, docs: '/docs/components/form/date-input' },
  { id: 'Input', cat: 'form', x: 36, y: 92, docs: '/docs/components/form/input' },
  { id: 'List', cat: 'data', x: 19, y: 84, docs: '/docs/components/data/list' },
  { id: 'Menu', cat: 'layers', x: 66, y: 94, docs: '/docs/components/layers/menu' },
  { id: 'Card', cat: 'layout', x: 47, y: 92, docs: '/docs/components/layout/card' },
  { id: 'MotionGroup', cat: 'motion', x: 8, y: 80, docs: '/docs/components/motion/motion-group' }
];

const EDGES: Array<[string, string]> = [
  ['IconButton', 'Button'],
  ['Calendar', 'Button'],
  ['ConfirmDialog', 'Button'],
  ['ConfirmDialog', 'Dialog'],
  ['DateInput', 'IconButton'],
  ['DateInput', 'Calendar'],
  ['DateInput', 'Input'],
  ['DateInput', 'Menu'],
  ['DateInput', 'Card'],
  ['DateInput', 'List'],
  ['CommandPalette', 'Card'],
  ['CommandPalette', 'List'],
  ['CommandPalette', 'MotionGroup'],
  ['Tabs', 'MotionGroup'],
  ['Stepper', 'MotionGroup'],
  ['Popover', 'Tooltip']
];

const MOBILE_CYCLE = ['Button', 'DateInput', 'CommandPalette', 'MotionGroup', 'Dialog'];
const MOBILE_DROP = new Set(['ConfirmDialog', 'Tabs', 'Stepper', 'Popover']);

function curveBetween(a: Node, b: Node) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  if (len < 0.001) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  const offset = Math.min(6, len * 0.13);
  const px = -dy / len;
  const py = dx / len;
  const cx = (a.x + b.x) / 2 + px * offset;
  const cy = (a.y + b.y) / 2 + py * offset;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

interface Pulse {
  id: number;
  edgeIdx: number;
  color: string;
}

const PulseDot: FC<{ pathId: string; color: string }> = ({ pathId, color }) => (
  <circle
    className="rb-graph-pulse"
    r="0.6"
    fill={color}
    style={{ filter: `drop-shadow(0 0 4px ${color})` }}
  >
    <animateMotion dur="0.75s" fill="freeze" rotate="auto">
      <mpath href={`#${pathId}`} />
    </animateMotion>
  </circle>
);

function useNearestNode(
  hostRef: React.RefObject<HTMLDivElement | null>,
  isMobile: boolean
) {
  const [hovered, setHovered] = useState<string | null>(null);
  useEffect(() => {
    if (isMobile) {
      setHovered(null);
      return;
    }
    const onMove = (e: MouseEvent) => {
      const host = hostRef.current;
      if (!host) return;
      const r = host.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        setHovered(null);
        return;
      }
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      let best: string | null = null;
      let bestD = 80;
      for (const n of NODES) {
        const nx = (n.x / 100) * r.width;
        const ny = (n.y / 100) * r.height;
        const d = Math.hypot(mx - nx, my - ny);
        if (d < bestD) {
          bestD = d;
          best = n.id;
        }
      }
      setHovered(best);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile, hostRef]);
  return hovered;
}

const ConstellationGraph: FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 960px)');
  const isSmallMobile = useMediaQuery('(max-width: 640px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const cursorHover = useNearestNode(hostRef, isMobile);
  const [cycleIdx, setCycleIdx] = useState(0);
  useEffect(() => {
    if (!isMobile || isSmallMobile) return;
    const t = setInterval(
      () => setCycleIdx((i) => (i + 1) % MOBILE_CYCLE.length),
      3000
    );
    return () => clearInterval(t);
  }, [isMobile, isSmallMobile]);
  const hovered = cursorHover || (isMobile ? MOBILE_CYCLE[cycleIdx] : null);

  const adj = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    EDGES.forEach(([a, b]) => {
      (m[a] = m[a] || new Set()).add(b);
      (m[b] = m[b] || new Set()).add(a);
    });
    return m;
  }, []);
  const neighbors = hovered ? adj[hovered] || new Set<string>() : null;

  const visibleNodes = useMemo(
    () => (isMobile ? NODES.filter((n) => !MOBILE_DROP.has(n.id)) : NODES),
    [isMobile]
  );
  const visibleNodeIds = useMemo(
    () => new Set(visibleNodes.map((n) => n.id)),
    [visibleNodes]
  );

  const nodeMap = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, Node>,
    []
  );
  const visibleEdges = useMemo(
    () =>
      EDGES.map(([a, b], i) => ({ a, b, i })).filter(
        ({ a, b }) => visibleNodeIds.has(a) && visibleNodeIds.has(b)
      ),
    [visibleNodeIds]
  );

  const [pulses, setPulses] = useState<Pulse[]>([]);
  useEffect(() => {
    if (reducedMotion) return;
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 4000 + Math.random() * 2000;
      timer = setTimeout(() => {
        if (!mounted) return;
        const candidates = visibleEdges;
        if (candidates.length) {
          const pick = candidates[Math.floor(Math.random() * candidates.length)];
          const node = nodeMap[pick.a];
          const id = Date.now() + Math.random();
          const pulse: Pulse = {
            id,
            edgeIdx: pick.i,
            color: CATEGORIES[node.cat]
          };
          setPulses((p) => [...p, pulse]);
          setTimeout(
            () => mounted && setPulses((p) => p.filter((x) => x.id !== id)),
            900
          );
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [visibleEdges, nodeMap, reducedMotion]);

  if (isSmallMobile) return null;

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 motion-safe:animate-rb-drift [will-change:transform]">
        <svg
          className="rb-graph-svg absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {EDGES.map(([a, b], i) => {
              const na = nodeMap[a];
              const nb = nodeMap[b];
              return (
                <path key={i} id={`rb-edge-${i}`} d={curveBetween(na, nb)} />
              );
            })}
          </defs>

          {visibleEdges.map(({ a, b, i }) => {
            const active = hovered && (a === hovered || b === hovered);
            const dim = hovered && !active;
            const color = active
              ? CATEGORIES[nodeMap[hovered].cat]
              : 'rgba(255,255,255,0.15)';
            return (
              <use
                key={i}
                href={`#rb-edge-${i}`}
                className={cn(
                  'rb-graph-edge',
                  active && 'is-active',
                  dim && 'is-dim'
                )}
                style={{ stroke: color }}
              />
            );
          })}

          {pulses.map((p) => (
            <PulseDot key={p.id} pathId={`rb-edge-${p.edgeIdx}`} color={p.color} />
          ))}
        </svg>

        {visibleNodes.map((n, i) => {
          const color = CATEGORIES[n.cat];
          const isHot = hovered === n.id;
          const isNear = !!neighbors && neighbors.has(n.id);
          const isDim = !!hovered && !isHot && !isNear;
          const style: CSSVarStyle = {
            left: `${n.x}%`,
            top: `${n.y}%`,
            animationDelay: `${(i % 7) * -0.7}s`,
            '--cat': color
          };
          return (
            <a
              key={n.id}
              href={n.docs}
              onClick={(e) => e.preventDefault()}
              className={cn(
                'rb-graph-node',
                isHot && 'is-hot',
                isNear && 'is-near',
                isDim && 'is-dim'
              )}
              style={style}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-[box-shadow,transform] duration-300"
                style={{ background: color, boxShadow: `0 0 8px ${color}aa` }}
              />
              <span>{n.id}</span>
            </a>
          );
        })}
      </div>

    </div>
  );
};

interface HeroProps {
  release: ReablocksRelease;
}

export const Hero: FC<HeroProps> = ({ release }) => (
  <section className="relative py-[88px] pb-[100px] overflow-hidden isolate max-[640px]:py-14 max-[640px]:pb-16">
    {/* Soft halo behind headline */}
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[30%] w-[1000px] h-[520px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-[45%] blur-[40px]"
      style={{
        background:
          'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16,94,255,0.18) 0%, rgba(0,197,240,0.08) 35%, transparent 70%)'
      }}
    />

    <ConstellationGraph />

    <div className="relative z-10 text-center w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
      <a
        href="https://www.npmjs.com/package/reablocks"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 font-mono text-[12.5px] text-rb-fg-1 pl-2.5 pr-3.5 py-1.5 rounded-full mb-6 border border-rb-hairline-strong bg-[linear-gradient(135deg,rgba(59,123,255,0.14)_0%,rgba(122,165,255,0.06)_50%,rgba(0,197,240,0.10)_100%)] shadow-[0_0_0_1px_rgba(122,165,255,0.08),0_8px_30px_-12px_rgba(59,123,255,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] [backdrop-filter:blur(10px)_saturate(150%)] transition-all hover:border-[rgba(122,165,255,0.5)] hover:shadow-[0_0_0_1px_rgba(122,165,255,0.16),0_10px_36px_-10px_rgba(59,123,255,0.75),inset_0_1px_0_rgba(255,255,255,0.12)] max-[640px]:text-[11px] max-[640px]:gap-2 max-[640px]:pl-2 max-[640px]:pr-3 max-[640px]:mb-5 max-[640px]:flex-wrap max-[640px]:justify-center"
      >
        <span className="relative flex shrink-0 w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-rb-good opacity-70 motion-safe:animate-rb-ping" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-rb-good shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
        </span>
        <span className="font-semibold tracking-[0.04em] uppercase text-[10.5px] text-rb-fg-2 group-hover:text-rb-fg-1 transition-colors">
          Latest
        </span>
        <span className="w-px h-3 bg-rb-hairline-2" aria-hidden="true" />
        <span className="text-white">v{release.version}</span>
        <span className="text-rb-fg-3">
          · <DateFormat date={release.publishedAt} fromNow />
        </span>
      </a>

      <h1 className="font-display font-semibold text-[clamp(32px,5.4vw,88px)] leading-[1.1] tracking-[-0.03em] mx-auto max-w-[16ch] text-white break-words max-[640px]:max-w-none max-[640px]:text-[26px]">
        <span className="block">Real components.</span>
        <span className="block">
          Real{' '}
          <em
            className="not-italic text-[#80B5FF]"
            style={{ textShadow: '0 0 28px rgba(128,181,255,0.35)' }}
          >
            motion
          </em>
          . Shipped.
        </span>
      </h1>

      <p className="max-w-[60ch] mx-auto mt-5 text-rb-fg-2 text-[18px] leading-[1.5] max-[640px]:text-[15.5px] max-[640px]:mt-4 max-[640px]:px-1">
        A premium React component library for ambitious enterprise apps. 70+
        components, 12 full-page blocks, theming as an object — not a config
        file.
      </p>

      <div className="flex flex-wrap justify-center gap-2.5 mt-[34px] max-[640px]:mt-7 max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-2">
        <a href="/docs/getting-started/setup" className="max-[640px]:contents">
          <Button variant="primary" size="lg" className="max-[640px]:w-full max-[640px]:justify-center">
            Get started <Icon.arrowRight />
          </Button>
        </a>
        <a
          href="https://github.com/reaviz/reablocks"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 font-sans font-medium rounded-[10px] border border-rb-hairline-2 bg-white/[0.04] text-rb-fg-1 hover:bg-white/[0.08] hover:border-rb-hairline-strong px-5 py-3.5 text-[15px] transition-all duration-150 whitespace-nowrap max-[640px]:px-4 max-[640px]:py-3 max-[640px]:text-[14px]"
        >
          <Icon.github /> Star on GitHub
          <span className="inline-flex items-center gap-1 ml-1.5 px-2 py-0.5 bg-black/35 rounded-full text-xs text-rb-fg-2">
            <Icon.star style={{ color: '#FBBF24' } as CSSProperties} /> 2.1k
          </span>
        </a>
      </div>
    </div>

    <div
      aria-hidden="true"
      className="absolute top-0 bottom-0 left-0 w-[120px] pointer-events-none z-[6] bg-gradient-to-r from-[#11111F] to-transparent max-[640px]:hidden"
    />

    <div
      aria-hidden="true"
      className="absolute top-0 bottom-0 right-0 w-[120px] pointer-events-none z-[6] bg-gradient-to-l from-[#11111F] to-transparent max-[640px]:hidden"
    />

    <div
      aria-hidden="true"
      className="absolute left-0 right-0 bottom-0 h-[120px] pointer-events-none z-[6] bg-gradient-to-b from-transparent to-[#11111F]"
    />
  </section>
);
