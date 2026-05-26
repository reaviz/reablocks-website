'use client';

import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
import { DateFormat } from 'reablocks';
import {
  ReablocksRelease,
  formatStarCount
} from '@/utils/reablocks-version';
import { Button, Icon } from './atoms';

const ISO_SCALE = 36;
const ISO_OFFSET_X = 80;
const ISO_OFFSET_Y = 70;

interface BoxDef {
  ox: number;
  oy: number;
  oz: number;
  w: number;
  d: number;
  h: number;
}

type GlyphKind =
  | 'page'
  | 'sidenav'
  | 'drawer'
  | 'dialog'
  | 'typography'
  | 'button';

interface LayerDef {
  kind: string;
  name: string;
  zIndex: number;
  color: string;
  box: BoxDef;
  glyph: GlyphKind;
}

const LAYERS: LayerDef[] = [
  {
    kind: 'page',
    name: '<Page />',
    zIndex: 0,
    color: '#9FB8FF',
    box: { ox: -5, oy: 0, oz: -5, w: 10, d: 10, h: 0.5 },
    glyph: 'page'
  },
  {
    kind: 'sidenav',
    name: '<SideNav />',
    zIndex: 100,
    color: '#C9B8FF',
    box: { ox: -5, oy: 2.0, oz: -5, w: 2.6, d: 10, h: 0.5 },
    glyph: 'sidenav'
  },
  {
    kind: 'drawer',
    name: '<Drawer />',
    zIndex: 200,
    color: '#A8E4F5',
    box: { ox: 0.4, oy: 4.0, oz: -5, w: 4.6, d: 10, h: 0.5 },
    glyph: 'drawer'
  },
  {
    kind: 'dialog',
    name: '<Dialog />',
    zIndex: 1000,
    color: '#A8E6C8',
    box: { ox: -2.5, oy: 6.0, oz: -2, w: 5, d: 4, h: 0.5 },
    glyph: 'dialog'
  },
  {
    kind: 'typography',
    name: '<Typography />',
    zIndex: 1010,
    color: '#F5DC9A',
    box: { ox: -2, oy: 7.6, oz: -1.6, w: 4, d: 2.4, h: 0.4 },
    glyph: 'typography'
  },
  {
    kind: 'button',
    name: '<Button />',
    zIndex: 1020,
    color: '#F5C49E',
    box: { ox: -0.9, oy: 9.2, oz: -0.5, w: 1.8, d: 1, h: 0.4 },
    glyph: 'button'
  }
];

interface Point {
  x: number;
  y: number;
}

interface BoxCorners {
  bnw: Point;
  bne: Point;
  bse: Point;
  bsw: Point;
  tnw: Point;
  tne: Point;
  tse: Point;
  tsw: Point;
}

const iso = (x: number, y: number, z: number, s = ISO_SCALE): Point => ({
  x: (x - z) * s,
  y: ((x + z) * 0.5 - y) * s
});

function boxCorners(box: BoxDef, s = ISO_SCALE): BoxCorners {
  const { ox, oy, oz, w, d, h } = box;
  const p = (x: number, y: number, z: number) => iso(x, y, z, s);
  return {
    bnw: p(ox, oy, oz + d),
    bne: p(ox + w, oy, oz + d),
    bse: p(ox + w, oy, oz),
    bsw: p(ox, oy, oz),
    tnw: p(ox, oy + h, oz + d),
    tne: p(ox + w, oy + h, oz + d),
    tse: p(ox + w, oy + h, oz),
    tsw: p(ox, oy + h, oz)
  };
}

function topFaceMatrix(c: BoxCorners) {
  // unit (u, v) maps as: (0,0)→tsw, (1,0)→tse, (0,1)→tnw
  const a = c.tse.x - c.tsw.x;
  const b = c.tse.y - c.tsw.y;
  const cc = c.tnw.x - c.tsw.x;
  const dd = c.tnw.y - c.tsw.y;
  return `matrix(${a} ${b} ${cc} ${dd} ${c.tsw.x} ${c.tsw.y})`;
}

const WireGlyph: FC<{ kind: GlyphKind; color: string }> = ({ kind, color }) => {
  const sw = 0.012;
  switch (kind) {
    case 'page':
      return (
        <g
          stroke="currentColor"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
        >
          <rect
            x={0.06}
            y={0.06}
            width={0.88}
            height={0.1}
            fill={color}
            fillOpacity={0.18}
          />
          <rect
            x={0.06}
            y={0.84}
            width={0.88}
            height={0.08}
            fill={color}
            fillOpacity={0.18}
          />
          {[0, 1, 2, 3].map(i => (
            <line
              key={`l${i}`}
              x1={0.1}
              y1={0.26 + i * 0.1}
              x2={0.46}
              y2={0.26 + i * 0.1}
            />
          ))}
          {[0, 1, 2, 3].map(i => (
            <line
              key={`r${i}`}
              x1={0.54}
              y1={0.26 + i * 0.1}
              x2={0.9}
              y2={0.26 + i * 0.1}
            />
          ))}
        </g>
      );
    case 'sidenav':
      return (
        <g
          stroke="currentColor"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
        >
          <rect x={0.18} y={0.06} width={0.64} height={0.1} />
          {Array.from({ length: 9 }, (_, i) => (
            <rect
              key={i}
              x={0.14}
              y={0.2 + i * 0.06}
              width={0.72}
              height={0.04}
              rx={0.015}
              fill={i === 2 ? color : 'none'}
              fillOpacity={i === 2 ? 0.34 : 0}
            />
          ))}
          <circle cx={0.5} cy={0.88} r={0.06} />
        </g>
      );
    case 'drawer':
      return (
        <g
          stroke="currentColor"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
        >
          <line x1={0.86} y1={0.06} x2={0.92} y2={0.12} />
          <line x1={0.92} y1={0.06} x2={0.86} y2={0.12} />
          <rect
            x={0.06}
            y={0.06}
            width={0.6}
            height={0.08}
            fill={color}
            fillOpacity={0.24}
          />
          {[0, 1, 2].map(i => (
            <g key={i}>
              <line
                x1={0.08}
                y1={0.24 + i * 0.2}
                x2={0.32}
                y2={0.24 + i * 0.2}
              />
              <rect
                x={0.08}
                y={0.28 + i * 0.2}
                width={0.84}
                height={0.08}
              />
            </g>
          ))}
          <rect
            x={0.66}
            y={0.86}
            width={0.26}
            height={0.08}
            fill={color}
            fillOpacity={0.42}
          />
        </g>
      );
    case 'dialog':
      return (
        <g
          stroke="currentColor"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
        >
          <line x1={0.86} y1={0.08} x2={0.94} y2={0.16} />
          <line x1={0.94} y1={0.08} x2={0.86} y2={0.16} />
          <rect
            x={0.08}
            y={0.08}
            width={0.5}
            height={0.08}
            fill={color}
            fillOpacity={0.26}
          />
          {[0, 1, 2].map(i => (
            <line
              key={i}
              x1={0.08}
              y1={0.34 + i * 0.1}
              x2={i === 2 ? 0.72 : 0.88}
              y2={0.34 + i * 0.1}
            />
          ))}
          <rect x={0.48} y={0.74} width={0.18} height={0.12} />
          <rect
            x={0.7}
            y={0.74}
            width={0.2}
            height={0.12}
            fill={color}
            fillOpacity={0.44}
          />
        </g>
      );
    case 'typography':
      return (
        <g stroke="currentColor" strokeWidth={sw} strokeLinecap="round">
          <rect
            x={0.06}
            y={0.1}
            width={0.5}
            height={0.08}
            fill={color}
            fillOpacity={0.55}
            stroke="none"
          />
          <rect
            x={0.06}
            y={0.26}
            width={0.4}
            height={0.05}
            fill={color}
            fillOpacity={0.32}
            stroke="none"
          />
          {[
            { w: 0.92, op: 1 },
            { w: 0.84, op: 0.82 },
            { w: 0.72, op: 0.64 },
            { w: 0.58, op: 0.46 }
          ].map((row, i) => (
            <line
              key={i}
              x1={0.06}
              y1={0.44 + i * 0.13}
              x2={row.w}
              y2={0.44 + i * 0.13}
              opacity={row.op}
              fill="none"
            />
          ))}
        </g>
      );
    case 'button':
      return (
        <g>
          <rect
            x={0.08}
            y={0.18}
            width={0.84}
            height={0.64}
            rx={0.28}
            ry={0.28}
            fill={color}
            fillOpacity={0.5}
            stroke="currentColor"
            strokeWidth={0.04}
          />
        </g>
      );
  }
};

interface WireBlockProps {
  layer: LayerDef;
  hov: string | null;
  onHover: (k: string | null) => void;
}

const WireBlock: FC<WireBlockProps> = ({ layer, hov, onHover }) => {
  const c = useMemo(() => boxCorners(layer.box), [layer.box]);
  const isHot = hov === layer.kind;
  const isDim = hov !== null && !isHot;
  const stroke = isHot ? '#FFFFFF' : layer.color;
  const sw = isHot ? 2.2 : 1.4;

  const topFacePath = `M ${c.tnw.x} ${c.tnw.y} L ${c.tne.x} ${c.tne.y} L ${c.tse.x} ${c.tse.y} L ${c.tsw.x} ${c.tsw.y} Z`;
  const matrix = topFaceMatrix(c);

  return (
    <g
      onMouseEnter={() => onHover(layer.kind)}
      onMouseLeave={() => onHover(null)}
      style={{
        transition: 'opacity 180ms ease-out',
        opacity: isDim ? 0.25 : 1,
        cursor: 'pointer'
      }}
    >
      {/* Top face fill + glow when hot */}
      <g
        style={{
          filter: isHot ? `drop-shadow(0 0 12px ${layer.color})` : undefined,
          transition: 'filter 180ms ease-out'
        }}
      >
        <path
          d={topFacePath}
          fill={layer.color}
          fillOpacity={isHot ? 0.16 : 0.05}
          style={{ transition: 'fill-opacity 180ms ease-out' }}
        />
      </g>

      {/* Back / hidden edges meeting at the rear-most bottom corner */}
      <g
        stroke={stroke}
        strokeWidth={sw}
        opacity={0.25}
        fill="none"
        strokeDasharray="3 3"
      >
        <line x1={c.bnw.x} y1={c.bnw.y} x2={c.bne.x} y2={c.bne.y} />
        <line x1={c.bnw.x} y1={c.bnw.y} x2={c.bsw.x} y2={c.bsw.y} />
        <line x1={c.bnw.x} y1={c.bnw.y} x2={c.tnw.x} y2={c.tnw.y} />
      </g>

      {/* Visible edges */}
      <g
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        style={{ transition: 'stroke 180ms ease-out, stroke-width 180ms ease-out' }}
      >
        <line x1={c.bne.x} y1={c.bne.y} x2={c.bse.x} y2={c.bse.y} />
        <line x1={c.bsw.x} y1={c.bsw.y} x2={c.bse.x} y2={c.bse.y} />
        <line x1={c.bne.x} y1={c.bne.y} x2={c.tne.x} y2={c.tne.y} />
        <line x1={c.bse.x} y1={c.bse.y} x2={c.tse.x} y2={c.tse.y} />
        <line x1={c.bsw.x} y1={c.bsw.y} x2={c.tsw.x} y2={c.tsw.y} />
        <line x1={c.tnw.x} y1={c.tnw.y} x2={c.tne.x} y2={c.tne.y} />
        <line x1={c.tne.x} y1={c.tne.y} x2={c.tse.x} y2={c.tse.y} />
        <line x1={c.tse.x} y1={c.tse.y} x2={c.tsw.x} y2={c.tsw.y} />
        <line x1={c.tsw.x} y1={c.tsw.y} x2={c.tnw.x} y2={c.tnw.y} />
      </g>

      {/* Top face glyph (unit-space drawing projected by affine matrix) */}
      <g transform={matrix} color={layer.color}>
        <WireGlyph kind={layer.glyph} color={layer.color} />
      </g>

      {/* Invisible hit target */}
      <path d={topFacePath} fill="transparent" pointerEvents="all" />
    </g>
  );
};

const COL_X = -340;
const ROW_W = 160;
const ROW_H = 38;
const TOP_Y = -250;
const ROW_RIGHT = COL_X + ROW_W;
const LEGEND_ROWS = LAYERS.length;

const IsoStage: FC<{
  hov: string | null;
  setHov: (k: string | null) => void;
}> = ({ hov, setHov }) => {
  // Sorted bottom-to-top so SVG painter order matches stacking
  const orderedByZ = useMemo(
    () => [...LAYERS].sort((a, b) => a.zIndex - b.zIndex),
    []
  );

  const topSpine = iso(0, 9.6, 0);
  const bottomSpine = iso(0, 0, 0);

  return (
    <svg
      viewBox="-360 -380 720 760"
      preserveAspectRatio="xMidYMid meet"
      className="block w-full h-full overflow-visible"
      aria-hidden="true"
    >
      {/* Legend (in raw viewBox coords, outside iso translate group) */}
      <g>
        <text
          x={ROW_RIGHT}
          y={TOP_Y - 22}
          textAnchor="end"
          fill="#00C5F0"
          opacity={0.75}
          fontFamily="var(--font-mono)"
          fontSize={9.5}
          fontWeight={600}
          letterSpacing="0.18em"
          style={{ textTransform: 'uppercase' }}
        >
          Layer Stack
        </text>
        <line
          x1={ROW_RIGHT + 4}
          y1={TOP_Y - 32}
          x2={ROW_RIGHT + 4}
          y2={TOP_Y + LEGEND_ROWS * ROW_H + 8}
          stroke="#00C5F0"
          strokeOpacity={0.35}
          strokeWidth={0.8}
        />

        {LAYERS.map((layer, i) => {
          // Buttom (i=0) at bottom of legend; Button (i=5) at top
          const rowY = TOP_Y + (LAYERS.length - 1 - i) * ROW_H;
          const isHot = hov === layer.kind;
          const isDim = hov !== null && !isHot;
          const c = boxCorners(layer.box);
          const leaderEndX = c.tnw.x + ISO_OFFSET_X;
          const leaderEndY = c.tnw.y + ISO_OFFSET_Y;
          const leaderStartX = ROW_RIGHT + 8;
          const leaderStartY = rowY + 8;
          return (
            <g
              key={layer.kind}
              onMouseEnter={() => setHov(layer.kind)}
              onMouseLeave={() => setHov(null)}
              style={{
                cursor: 'pointer',
                transition: 'opacity 180ms ease-out',
                opacity: isDim ? 0.35 : 1
              }}
            >
              {/* Row background when hot */}
              {isHot && (
                <rect
                  x={COL_X - 6}
                  y={rowY - 10}
                  width={ROW_W + 12}
                  height={ROW_H - 4}
                  rx={4}
                  fill={layer.color}
                  fillOpacity={0.12}
                  stroke={layer.color}
                  strokeOpacity={0.8}
                  strokeWidth={0.8}
                />
              )}

              {/* Swatch */}
              <rect
                x={COL_X}
                y={rowY}
                width={5}
                height={14}
                rx={1.5}
                fill={layer.color}
              />

              {/* Component name */}
              <text
                x={COL_X + 14}
                y={rowY + 11}
                fill={isHot ? '#FFFFFF' : layer.color}
                fontFamily="var(--font-mono)"
                fontSize={11.5}
                fontWeight={isHot ? 700 : 500}
              >
                {layer.name}
              </text>

              {/* Right tick */}
              <line
                x1={ROW_RIGHT}
                y1={rowY + 8}
                x2={ROW_RIGHT + 6}
                y2={rowY + 8}
                stroke={layer.color}
                strokeWidth={isHot ? 1.8 : 1.2}
              />

              {/* Leader to layer */}
              <line
                x1={leaderStartX}
                y1={leaderStartY}
                x2={leaderEndX}
                y2={leaderEndY}
                stroke={layer.color}
                strokeWidth={isHot ? 1.4 : 0.8}
                strokeOpacity={isHot ? 1 : 0.55}
                strokeDasharray={isHot ? undefined : '2 3'}
              />

              {/* Anchor dot on the leader endpoint */}
              <circle
                cx={leaderEndX}
                cy={leaderEndY}
                r={isHot ? 3.4 : 2.8}
                fill={layer.color}
                opacity={isHot ? 1 : 0.65}
              />
            </g>
          );
        })}
      </g>

      {/* Iso scene */}
      <g transform={`translate(${ISO_OFFSET_X}, ${ISO_OFFSET_Y})`}>
        {/* Central spine */}
        <line
          x1={bottomSpine.x}
          y1={bottomSpine.y}
          x2={topSpine.x}
          y2={topSpine.y}
          stroke="#80E2F8"
          strokeWidth={0.8}
          strokeDasharray="2 4"
          opacity={0.4}
        />

        {orderedByZ.map(layer => (
          <WireBlock
            key={layer.kind}
            layer={layer}
            hov={hov}
            onHover={setHov}
          />
        ))}
      </g>
    </svg>
  );
};


interface HeroProps {
  release: ReablocksRelease;
}

const AUTO_HIGHLIGHT_MS = 3000;
const RESUME_DELAY_MS = 3000;
const INITIAL_BLANK_MS = 5000;

export const Hero: FC<HeroProps> = ({ release }) => {
  const [userHov, setUserHov] = useState<string | null>(null);
  const [autoIdx, setAutoIdx] = useState<number | null>(null);
  const clearHovTimerRef = useRef<number | null>(null);

  const cycleKinds = useMemo(
    () => [...LAYERS].sort((a, b) => b.zIndex - a.zIndex).map(l => l.kind),
    []
  );

  // Defer mouseleave (kind=null) by RESUME_DELAY_MS so quick traversals between
  // legend rows don't flash the auto-cycled layer through the gap.
  const handleHov = (kind: string | null) => {
    if (clearHovTimerRef.current !== null) {
      window.clearTimeout(clearHovTimerRef.current);
      clearHovTimerRef.current = null;
    }
    if (kind !== null) {
      setUserHov(kind);
      return;
    }
    clearHovTimerRef.current = window.setTimeout(() => {
      setUserHov(null);
      setAutoIdx(null);
      clearHovTimerRef.current = null;
    }, RESUME_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      if (clearHovTimerRef.current !== null) {
        window.clearTimeout(clearHovTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (userHov !== null) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    let timeoutId: number | undefined;
    const scheduleNext = (delay: number) => {
      timeoutId = window.setTimeout(() => {
        setAutoIdx(i => (i === null ? 0 : (i + 1) % cycleKinds.length));
        scheduleNext(AUTO_HIGHLIGHT_MS);
      }, delay);
    };
    scheduleNext(autoIdx === null ? INITIAL_BLANK_MS : AUTO_HIGHLIGHT_MS);
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
    // autoIdx is intentionally captured at effect-start to decide the first
    // delay; we don't want to restart the chain on every tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHov, cycleKinds.length]);

  const hov = userHov ?? (autoIdx !== null ? cycleKinds[autoIdx] : null);

  return (
    <section
      className="relative overflow-hidden isolate"
      style={{
        background:
          'linear-gradient(180deg, #06092B 0%, #050717 100%)'
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(128,226,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(128,226,248,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 pt-[74px] pb-0 max-[640px]:px-5 max-[640px]:pt-[64px] max-[640px]:pb-4">
        {/* Two-column grid */}
        <div className="grid grid-cols-[1fr_1fr] gap-0 min-h-[400px] max-[960px]:grid-cols-1 max-[960px]:min-h-0">
          {/* Copy column */}
          <div className="px-4 py-6 pr-10 max-[960px]:pr-4 max-[960px]:text-center max-[640px]:px-0 max-[640px]:py-4">
            <span className="inline-flex items-center gap-2 font-mono uppercase text-[11.5px] tracking-[0.18em] text-rb-cyan-300 mb-7 max-[640px]:mb-5 max-[640px]:text-[10.5px] before:content-[''] before:w-7 before:h-px before:bg-[#00C5F0] before:opacity-70" style={{ color: '#00C5F0' } as CSSProperties}>
              Engineered as one
            </span>

            <h1 className="font-display font-semibold text-[clamp(28px,5vw,60px)] leading-[1.1] tracking-[-0.025em] my-4 text-white max-[640px]:my-3">
              <span className="block">Real components.</span>
              <span className="block">
                Real{' '}
                <span
                  className="font-semibold not-italic"
                  style={{
                    fontFamily: 'Lexend, Inter, sans-serif',
                    background:
                      'linear-gradient(135deg, #80E2F8 0%, #3B7BFF 60%, #80B5FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  } as CSSProperties}
                >
                  motion
                </span>
                .
              </span>
              <span className="block">Shipped.</span>
            </h1>

            <p className="text-rb-fg-2 text-[16.5px] leading-[1.55] max-w-[44ch] mb-7 max-[960px]:mx-auto max-[640px]:text-[15px] max-[640px]:mb-5">
              From button to full dashboard in an afternoon. A premium React
              library with 70 components and 12 page-level blocks.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 mb-5 max-[960px]:justify-center max-[640px]:mb-4">
              <a href="/docs/getting-started/setup">
                <Button
                  variant="primary"
                  size="md"
                  className="px-[18px] py-[13px] rounded-[10px]"
                >
                  Get started <Icon.arrowRight />
                </Button>
              </a>
              <a
                href="https://github.com/reaviz/reablocks"
                target="_blank"
                rel="noreferrer"
                className="group/star inline-flex items-stretch font-sans font-medium text-[14px] rounded-[10px] border border-rb-hairline-2 bg-white/[0.04] text-rb-fg-1 hover:bg-white/[0.08] hover:border-rb-hairline-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_-12px_rgba(251,191,36,0.45)] transition-all duration-200"
                aria-label={`Star reablocks on GitHub (${release.stars.toLocaleString()} stars)`}
              >
                <span className="inline-flex items-center gap-2 pl-[16px] pr-[12px] py-[13px]">
                  <Icon.github />
                  <span>Star</span>
                </span>
                <span
                  aria-hidden="true"
                  className="w-px self-stretch bg-rb-hairline-2 group-hover/star:bg-rb-hairline-strong transition-colors"
                />
                <span className="inline-flex items-center gap-1.5 pl-[12px] pr-[16px] py-[13px] font-mono text-[13px] tracking-tight">
                  <Icon.star
                    className="transition-transform duration-200 group-hover/star:scale-110 group-hover/star:rotate-[12deg]"
                    style={
                      {
                        color: '#FBBF24',
                        filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.55))'
                      } as CSSProperties
                    }
                  />
                  <span className="text-white tabular-nums">
                    {formatStarCount(release.stars)}
                  </span>
                </span>
              </a>
            </div>

            {/* Release pill */}
            <div className="inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-rb-fg-2 px-3 py-1.5 rounded-full border border-[rgba(122,165,255,0.28)]">
              <span className="relative flex shrink-0 w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-rb-good opacity-70 motion-safe:animate-rb-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-rb-good shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
              </span>
              <span className="text-white normal-case tracking-normal">
                v{release.version}
              </span>
              <span className="text-rb-fg-3 normal-case tracking-normal">
                · released <DateFormat date={release.publishedAt} fromNow />
              </span>
            </div>
          </div>

          {/* Iso stage */}
          <div className="relative min-h-[540px] max-[960px]:min-h-[420px] max-[640px]:min-h-[360px] border-l border-[rgba(255,255,255,0.10)] max-[960px]:border-l-0 max-[960px]:border-t max-[960px]:border-[rgba(255,255,255,0.10)] max-[960px]:mt-4 max-[960px]:pt-4 max-[640px]:mt-3 max-[640px]:pt-3">
            <IsoStage hov={hov} setHov={handleHov} />
          </div>
        </div>

      </div>
    </section>
  );
};
