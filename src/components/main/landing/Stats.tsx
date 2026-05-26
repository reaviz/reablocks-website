'use client';

import { FC, useEffect, useState } from 'react';
import { useInView } from './atoms';

interface Stat {
  key: string;
  label: string;
  subtitle: string;
  value: number;
  suffix: string;
}

const STATS: Stat[] = [
  {
    key: 'components',
    label: 'components',
    subtitle: 'data · form · layers · layout · typography',
    value: 60,
    suffix: '+'
  },
  {
    key: 'blocks',
    label: 'full-page blocks',
    subtitle: 'foundation · administration · authentication',
    value: 40,
    suffix: '+'
  },
  {
    key: 'stories',
    label: 'storybook stories',
    subtitle: 'every component, in every state',
    value: 400,
    suffix: '+'
  },
  {
    key: 'utilities',
    label: 'utilities & hooks',
    subtitle: 'Portal · Theme · useId · slots · …',
    value: 10,
    suffix: '+'
  }
];

function useCountUp(target: number, { start, duration = 1500 }: { start: boolean; duration?: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

const LedgerCell: FC<{ stat: Stat }> = ({ stat }) => {
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const value = useCountUp(stat.value, { start: seen });
  return (
    <div
      ref={ref}
      role="group"
      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
      className="flex flex-col items-center text-center gap-2 px-7 py-10 max-md:py-7 max-md:px-5"
    >
      <div
        aria-hidden="true"
        className="font-display font-semibold text-[clamp(42px,7vw,80px)] leading-none tabular-nums text-white"
      >
        {value}
        <span className="text-cyan-300">{stat.suffix}</span>
      </div>
      <div
        aria-hidden="true"
        className="font-sans text-[13px] text-rb-fg-2 leading-tight"
      >
        {stat.label}
      </div>
      <div className="font-sans text-[11px] text-rb-fg-3 leading-snug max-w-[34ch]">
        {stat.subtitle}
      </div>
    </div>
  );
};

export const Stats: FC = () => (
  <section
    id="stats"
    aria-label="Reablocks library statistics"
    className="pb-20 max-md:pb-7"
  >
    <div className="border-t border-b border-rb-hairline">
      <div className="w-full max-w-[1240px] mx-auto grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 [&>*+*]:border-l [&>*+*]:border-rb-hairline max-md:[&>*:nth-child(3)]:border-l-0 max-md:[&>*:nth-child(n+3)]:border-t max-md:[&>*:nth-child(n+3)]:border-rb-hairline max-sm:[&>*+*]:border-l-0 max-sm:[&>*+*]:border-t">
        {STATS.map((s) => (
          <LedgerCell key={s.key} stat={s} />
        ))}
      </div>
    </div>
  </section>
);
