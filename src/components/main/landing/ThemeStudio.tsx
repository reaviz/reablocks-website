'use client';

import { cn } from '@/utils/cn';
import { CSSProperties, FC, ReactNode, useMemo, useState } from 'react';
import {
  LiveProvider,
  LiveError,
  LivePreview
} from 'react-live-runner';
import * as Reablocks from 'reablocks';
import * as React from 'react';
import {
  ThemeProvider,
  extendTheme,
  mergeThemeClasses,
  theme
} from 'reablocks';
import {
  CodeBlock,
  CopyButton,
  CSSVarStyle,
  SectionHead
} from './atoms';

type TokenKey =
  | 'primary'
  | 'secondary'
  | 'panel'
  | 'panel-accent'
  | 'text-primary'
  | 'text-secondary';

const PRESETS: Record<TokenKey, string[]> = {
  primary: ['#105EFF', '#7C3AED', '#10B981', '#F97066', '#F59E0B', '#06B6D4'],
  secondary: ['#2A2D3B', '#1F2937', '#334155', '#3F3F46', '#1E1B4B', '#451A03'],
  panel: ['#1A1C2A', '#0F172A', '#111827', '#18181B', '#0E1020', '#1C1917'],
  'panel-accent': [
    '#2A2D3B',
    '#1E293B',
    '#1F2937',
    '#27272A',
    '#1A1F30',
    '#292524'
  ],
  // Light tints across the spectrum — all kept >= ~92% perceived luminance
  // so they stay legible on every panel/panel-accent preset.
  'text-primary': [
    '#FFFFFF', // pure white
    '#E5E7EB', // cool slate
    '#FEF3C7', // warm cream
    '#E0F2FE', // soft sky
    '#DCFCE7', // mint
    '#FAE8FF'  // lilac
  ],
  'text-secondary': [
    '#9CA3AF',
    '#94A3B8',
    '#6B7280',
    '#A1A1AA',
    '#71717A',
    '#B0B3C0'
  ]
};

const TOKEN_ORDER: TokenKey[] = [
  'primary',
  'secondary',
  'panel',
  'panel-accent',
  'text-primary',
  'text-secondary'
];

const RADIUS = [
  { name: 'sharp', value: 4, iconR: 1 },
  { name: 'soft', value: 10, iconR: 4 },
  { name: 'pill', value: 22, iconR: 10 }
] as const;
type RadiusOpt = (typeof RADIUS)[number];

const DENSITY = [
  { name: 'compact', padY: 6, padX: 10, fs: 13 },
  { name: 'comfortable', padY: 10, padX: 14, fs: 14 }
] as const;
type DensityOpt = (typeof DENSITY)[number];

// Static Tailwind class strings — these literals appear in source so the
// Tailwind scanner picks them up. They're recombined at runtime to drive
// per-component `sizes` theme overrides.
const RADIUS_CLASSES: Record<RadiusOpt['name'], string> = {
  sharp: 'rounded-[4px]',
  soft: 'rounded-[10px]',
  pill: 'rounded-[22px]'
};

// Per-density class buckets. Each component's `sizes` slot maps onto one of
// these (medium = base, small = tighter). Strings are literal so Tailwind's
// scanner can emit them.
const SIZE_BY_DENSITY: Record<
  DensityOpt['name'],
  {
    button: string;
    buttonSm: string;
    chip: string;
    chipSm: string;
    input: string;
    inputSm: string;
    toggle: string;
    toggleSm: string;
    handle: string;
    handleSm: string;
    icon: string;
    iconSm: string;
  }
> = {
  compact: {
    button: 'px-[10px] py-[6px] text-[13px]',
    buttonSm: 'px-[8px] py-[3px] text-[12px]',
    chip: 'px-2 py-0.5 text-[11.5px]',
    chipSm: 'px-1.5 py-0.5 text-[10.5px]',
    input: 'px-[10px] py-[6px] text-[13px]',
    inputSm: 'px-[8px] py-[4px] text-[12px]',
    toggle: 'w-10 h-5 p-px',
    toggleSm: 'w-8 h-4 p-px',
    handle: 'w-4 h-full',
    handleSm: 'w-3 h-full',
    icon: '[&>svg]:w-3.5 [&>svg]:h-3.5',
    iconSm: '[&>svg]:w-3 [&>svg]:h-3'
  },
  comfortable: {
    button: 'px-[14px] py-[10px] text-[14px]',
    buttonSm: 'px-[10px] py-[5px] text-[12.5px]',
    chip: 'px-2.5 py-1 text-[12.5px]',
    chipSm: 'px-2 py-0.5 text-[11.5px]',
    input: 'px-[14px] py-[10px] text-[14px]',
    inputSm: 'px-[10px] py-[6px] text-[13px]',
    toggle: 'w-12 h-6 p-px',
    toggleSm: 'w-9 h-5 p-px',
    handle: 'w-5 h-full',
    handleSm: 'w-4 h-full',
    icon: '[&>svg]:w-4 [&>svg]:h-4',
    iconSm: '[&>svg]:w-3.5 [&>svg]:h-3.5'
  }
};

const TABS = ['Palette', 'Text', 'Layout'] as const;
type Tab = (typeof TABS)[number];

const TAB_TOKENS: Record<Exclude<Tab, 'Layout'>, TokenKey[]> = {
  Palette: ['primary', 'secondary', 'panel', 'panel-accent'],
  Text: ['text-primary', 'text-secondary']
};

const RING_BLUE = '#105EFF';

function defaultTokens(): Record<TokenKey, string> {
  const out = {} as Record<TokenKey, string>;
  for (const k of TOKEN_ORDER) out[k] = PRESETS[k][0];
  return out;
}

function hexToRgba(hex: string, alpha: number) {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ---------- Sidebar pieces ----------------------------------------------

const TokenRow: FC<{
  name: TokenKey;
  value: string;
  swatches: readonly string[];
  onChange: (hex: string) => void;
}> = ({ name, value, swatches, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between font-mono text-[11px]">
      <span className="text-rb-fg-2">{name}</span>
      <span className="text-rb-fg-3 opacity-70">{value.toUpperCase()}</span>
    </div>
    <div className="grid grid-cols-6 gap-1.5">
      {swatches.map((s) => {
        const selected = s.toLowerCase() === value.toLowerCase();
        return (
          <button
            key={s}
            type="button"
            aria-label={`${name} ${s}`}
            aria-pressed={selected}
            onClick={() => onChange(s)}
            className="h-[22px] rounded-md cursor-pointer p-0 border-0 transition-transform duration-150 hover:-translate-y-px"
            style={{
              background: s,
              boxShadow: selected
                ? `0 0 0 2px var(--color-rb-bg-1), 0 0 0 4px ${RING_BLUE}`
                : 'inset 0 0 0 1px rgba(255,255,255,0.06)'
            }}
          />
        );
      })}
    </div>
  </div>
);

const Segment: FC<{
  label: string;
  options: readonly { name: string }[];
  value: string;
  onChange: (name: string) => void;
  render?: (o: { name: string }, selected: boolean) => ReactNode;
}> = ({ label, options, value, onChange, render }) => (
  <div className="flex flex-col gap-2">
    <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-rb-fg-3">
      {label}
    </span>
    <div className="inline-flex p-[3px] bg-white/[0.04] border border-rb-hairline rounded-lg w-full">
      {options.map((o) => {
        const selected = value === o.name;
        return (
          <button
            key={o.name}
            type="button"
            onClick={() => onChange(o.name)}
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 font-sans text-[12.5px] rounded-md cursor-pointer transition-colors',
              selected
                ? 'bg-white/[0.09] text-white'
                : 'bg-transparent text-rb-fg-2 hover:text-white'
            )}
          >
            {render ? render(o, selected) : o.name}
          </button>
        );
      })}
    </div>
  </div>
);

// ---------- Live preview code -------------------------------------------
//
// The live code is STATIC: tokens flow through CSS variables set on the
// host stage wrapper, so React-Live needs to evaluate this string only once.
// Switching tabs or picking swatches just updates the host's --vars; the
// preview re-paints with the cascade.
//
// Add reablocks components inside the render() call — they will inherit
// the stage's CSS vars (primary, secondary, surface, etc.) automatically.

const LIVE_CODE = `import { useState } from 'react';
import {
  Card,
  Button,
  Chip,
  Divider,
  Toggle,
  Checkbox,
  Radio,
  RadioGroup,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  RangeDouble,
  List,
  ListItem,
  H3,
  H4,
  Small,
  Muted,
} from 'reablocks';

const Eyebrow = ({ children }) => (
  <Small className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
    {children}
  </Small>
);

const SectionLabel = ({ children }) => (
  <Small className="block text-right font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
    {children}
  </Small>
);

const CHANNELS = [
  { key: 'email', label: 'Email' },
  { key: 'push',  label: 'Push' },
  { key: 'inapp', label: 'In-app' },
];

const ROWS = [
  { key: 'mentions', title: 'Mentions & replies', desc: 'when someone @-mentions you' },
  { key: 'comments', title: 'New comments',       desc: 'on your docs and threads' },
  { key: 'assigned', title: 'Assigned to you',    desc: 'tasks, reviews, approvals' },
  { key: 'invites',  title: 'Workspace invites',  desc: 'new members joining' },
  { key: 'digest',   title: 'Weekly digest',      desc: 'sundays · 8am local' },
];

const CADENCE_HINT = {
  instant: 'Send the moment events happen.',
  hourly:  'Batched and delivered every hour.',
  daily:   'One digest, every morning.',
};

const FILTER_TABS = [
  { key: 'who',  label: 'Who' },
  { key: 'how',  label: 'How' },
  { key: 'when', label: 'When' },
];

const SEGMENTS = [
  { key: 'all',    title: 'All customers',          count: 184322, disabled: false },
  { key: 'pro',    title: 'Pro plan · active',      count: 28140,  disabled: false },
  { key: 'atrisk', title: 'At risk (30d no login)', count: 4902,   disabled: false },
  { key: 'new',    title: 'New this month',         count: 3318,   disabled: false },
  { key: 'legacy', title: 'Legacy · grandfathered', count: 912,    disabled: true },
];

const fmt = (n) => n.toLocaleString('en-US');

const Demo = () => {
  // 02 · Settings state
  const [channelIdx, setChannelIdx] = useState(0);
  const [channels, setChannels] = useState({
    email: { mentions: true, comments: true, assigned: true, invites: false, digest: true },
    push:  { mentions: true, comments: false, assigned: true, invites: false, digest: false },
    inapp: { mentions: true, comments: true, assigned: false, invites: false, digest: false },
  });
  const [cadence, setCadence] = useState('instant');
  const [muteWeekends, setMuteWeekends] = useState(true);
  const [autoMute, setAutoMute] = useState(false);
  const [dndRespect, setDndRespect] = useState(true);

  const channel = CHANNELS[channelIdx];
  const prefs = channels[channel.key];
  const setPref = (k, v) =>
    setChannels((c) => ({ ...c, [channel.key]: { ...c[channel.key], [k]: v } }));
  const onCount = Object.values(prefs).filter(Boolean).length;

  // 03 · Audience filter state
  const [filterTabIdx, setFilterTabIdx] = useState(0);
  const [ageRange, setAgeRange] = useState<[number, number]>([24, 48]);
  const [ltv, setLtv] = useState<[number, number]>([200, 2200]);
  const [reachable, setReachable] = useState({
    email: true,
    push: true,
    sms: false,
    inApp: true
  });
  const [selectedSegment, setSelectedSegment] = useState('pro');
  const [live, setLive] = useState(true);

  const reachCount = Object.values(reachable).filter(Boolean).length;
  const allReachable = reachCount === 4;
  const someReachable = reachCount > 0 && !allReachable;
  const toggleAllReachable = () => {
    const next = !allReachable;
    setReachable({ email: next, push: next, sms: next, inApp: next });
  };

  const matches = Math.max(
    0,
    Math.round(
      184322 *
        ((ageRange[1] - ageRange[0]) / (65 - 18)) *
        ((ltv[1] - ltv[0]) / 5000) *
        (reachCount / 4)
    )
  );

  return (
    <div className="grid grid-cols-2 gap-6 items-stretch max-[960px]:grid-cols-1 max-[960px]:justify-items-center">
      {/* 01 · Settings — Notification preferences */}
      <div className="w-full max-w-[440px] h-full">
        <Card className="rounded-2xl h-full" contentClassName="flex flex-col h-full">
          <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1.5 min-w-0">
                <Eyebrow>01 · Settings</Eyebrow>
                <H4 className="text-[20px] text-[var(--text-primary)] leading-tight tracking-normal scroll-m-0">
                  Notification preferences
                </H4>
                <Muted className="text-[13px] text-[var(--text-secondary)]">
                  Per-channel rules, with a cadence picker and quiet-hours overrides.
                </Muted>
              </div>
              <Chip variant="outline">Preferences</Chip>
            </div>

            <Divider disableMargins />

            {/* Tabs + status */}
            <div className="flex flex-col gap-1">
              <Tabs selectedIndex={channelIdx} onSelect={setChannelIdx}>
                <TabList>
                  {CHANNELS.map((c) => (
                    <Tab key={c.key}>{c.label}</Tab>
                  ))}
                </TabList>
              </Tabs>
              <SectionLabel>
                {channel.label} · {onCount} of {ROWS.length} on
              </SectionLabel>
            </div>

            {/* Toggle rows */}
            <div className="flex flex-col">
              {ROWS.map((row, i) => (
                <div
                  key={row.key}
                  className={
                    'flex items-center justify-between gap-4 py-3 ' +
                    (i !== 0 ? 'border-t border-[var(--rb-stage-hairline)]' : '')
                  }
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <Small className="text-[14px] text-[var(--text-primary)]">
                      {row.title}
                    </Small>
                    <Muted className="font-mono text-[11.5px] text-[var(--text-secondary)]">
                      {row.desc}
                    </Muted>
                  </div>
                  <Toggle
                    checked={prefs[row.key]}
                    onChange={(v) => setPref(row.key, v)}
                  />
                </div>
              ))}
            </div>

            {/* Cadence */}
            <div className="flex flex-col gap-1.5">
              <SectionLabel>Cadence</SectionLabel>
              <div className="rounded-lg border border-[var(--rb-stage-hairline)] p-3">
                <RadioGroup onChange={setCadence} selectedValue={cadence}>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <Radio value="instant" label="Instant" />
                    <Radio value="hourly" label="Hourly" />
                    <Radio value="daily" label="Daily digest" />
                  </div>
                </RadioGroup>
                <Muted className="text-[12.5px] text-[var(--text-secondary)] mt-2">
                  {CADENCE_HINT[cadence]}
                </Muted>
              </div>
            </div>

            {/* Quiet hours */}
            <div className="flex flex-col gap-1.5">
              <SectionLabel>Quiet hours</SectionLabel>
              <div className="rounded-lg border border-[var(--rb-stage-hairline)] p-3 flex flex-col gap-2">
                <Checkbox label="Mute weekends" checked={muteWeekends} onChange={setMuteWeekends} />
                <Checkbox label="Auto-mute during focus blocks" checked={autoMute} onChange={setAutoMute} />
                <Checkbox label="Respect OS Do Not Disturb" checked={dndRespect} onChange={setDndRespect} />
              </div>
            </div>

            {/* Footer — pinned to the bottom via mt-auto */}
            <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
              <Button variant="text" color="primary" size="small">Reset to defaults</Button>
              <div className="flex gap-2">
                <Button variant="outline" size="small">Discard</Button>
                <Button variant="filled" color="primary" size="small">Save changes</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 02 · Targeting — Audience filter */}
      <div className="w-full max-w-[440px] h-full">
        <Card className="rounded-2xl h-full" contentClassName="flex flex-col h-full">
          <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1.5 min-w-0">
                <Eyebrow>02 · Targeting</Eyebrow>
                <H4 className="text-[20px] text-[var(--text-primary)] leading-tight tracking-normal scroll-m-0">
                  Audience filter
                </H4>
                <Muted className="text-[13px] text-[var(--text-secondary)]">
                  Build a segment from ranges and flags. Preview the count update live.
                </Muted>
              </div>
              <Chip variant="outline">Filter</Chip>
            </div>

            <Divider disableMargins />

            {/* Tabs */}
            <Tabs selectedIndex={filterTabIdx} onSelect={setFilterTabIdx}>
              <TabList>
                {FILTER_TABS.map((t) => (
                  <Tab key={t.key}>{t.label}</Tab>
                ))}
              </TabList>
            </Tabs>

            {/* Age range */}
            <div className="flex flex-col gap-1.5">
              <SectionLabel>Age range</SectionLabel>
              <div className="rounded-lg border border-[var(--rb-stage-hairline)] px-3 pt-5 pb-3">
                <RangeDouble
                  min={18}
                  max={65}
                  value={ageRange}
                  onChange={([a, b]) => setAgeRange([a, b])}
                  style={{ width: '100%' }}
                />
                <div className="flex justify-between mt-4">
                  <Small className="font-mono text-[12px] font-normal text-[var(--text-secondary)]">
                    min 18y
                  </Small>
                  <Small className="font-mono text-[12px] font-normal text-[var(--text-secondary)]">
                    <span style={{ color: 'var(--primary)' }}>
                      {ageRange[0]}y
                    </span>{' '}
                    –{' '}
                    <span style={{ color: 'var(--primary)' }}>
                      {ageRange[1]}y
                    </span>
                  </Small>
                  <Small className="font-mono text-[12px] font-normal text-[var(--text-secondary)]">
                    max 65y
                  </Small>
                </div>
              </div>
            </div>

            {/* Reachable on */}
            <div className="flex flex-col gap-1.5">
              <SectionLabel>Reachable on</SectionLabel>
              <div className="rounded-lg border border-[var(--rb-stage-hairline)] p-3 flex flex-col gap-2">
                <Checkbox
                  label="Intermediate"
                  checked={someReachable}
                  intermediate={someReachable}
                  onChange={toggleAllReachable}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Checkbox
                    label="Email"
                    checked={reachable.email}
                    onChange={(v) => setReachable((r) => ({ ...r, email: v }))}
                  />
                  <Checkbox
                    label="Push"
                    checked={reachable.push}
                    onChange={(v) => setReachable((r) => ({ ...r, push: v }))}
                  />
                  <Checkbox
                    label="SMS"
                    checked={reachable.sms}
                    onChange={(v) => setReachable((r) => ({ ...r, sms: v }))}
                  />
                  <Checkbox
                    label="In-app"
                    checked={reachable.inApp}
                    onChange={(v) => setReachable((r) => ({ ...r, inApp: v }))}
                  />
                </div>
              </div>
            </div>

            {/* Saved segments */}
            <div className="flex flex-col gap-1.5">
              <SectionLabel>Saved segments</SectionLabel>
              <div className="rounded-lg border border-[var(--rb-stage-hairline)] p-1">
                <List style={{ width: '100%' }}>
                  {SEGMENTS.map((s) => {
                    const isActive = s.key === selectedSegment;
                    return (
                      <ListItem
                        key={s.key}
                        active={isActive}
                        disabled={s.disabled}
                        className="hover:bg-panel-accent rounded-md"
                        onClick={() => !s.disabled && setSelectedSegment(s.key)}
                        start={
                          <Checkbox
                            containerClassName="mr-2"
                            checked={isActive}
                            disabled={s.disabled}
                            onChange={() =>
                              !s.disabled && setSelectedSegment(s.key)
                            }
                          />
                        }
                        end={
                          <Small className="font-mono text-[12px] font-normal text-[var(--text-secondary)]">
                            {fmt(s.count)}
                          </Small>
                        }
                      >
                        {s.title}
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>

            {/* Matches + Live toggle */}
            <div className="flex items-end justify-between gap-3">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: '#22C55E' }}
                  />
                  <Small className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                    Matches · Live
                  </Small>
                </div>
                <H3 className="text-[22px] text-[var(--text-primary)] leading-none mt-0 tracking-normal scroll-m-0">
                  {fmt(matches)}{' '}
                  <Small className="text-[13px] font-normal text-[var(--text-secondary)]">
                    of {fmt(184322)}
                  </Small>
                </H3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Small className="text-[13px] font-normal text-[var(--text-secondary)]">
                  Live
                </Small>
                <Toggle checked={live} onChange={setLive} />
              </div>
            </div>

            {/* Footer — pinned to the bottom via mt-auto */}
            <div className="flex items-center justify-end gap-2 pt-1 mt-auto">
              <Button variant="outline" size="small">Save segment</Button>
              <Button variant="filled" color="primary" size="small">Apply filter</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

render(<Demo />);`;

const liveScope = {
  import: {
    reablocks: Reablocks,
    react: React
  }
};

// ---------- Component ---------------------------------------------------

export const ThemeStudio: FC = () => {
  const [tab, setTab] = useState<Tab>('Palette');
  const [tokens, setTokens] =
    useState<Record<TokenKey, string>>(defaultTokens());
  const [radius, setRadius] = useState<RadiusOpt>(RADIUS[1]);
  const [density, setDensity] = useState<DensityOpt>(DENSITY[1]);

  const setToken = (k: TokenKey) => (v: string) =>
    setTokens((prev) => ({ ...prev, [k]: v }));

  const reset = () => {
    setTokens(defaultTokens());
    setRadius(RADIUS[1]);
    setDensity(DENSITY[1]);
    setTab('Palette');
  };

  // Reablocks-native theme override: drive per-component `sizes` via theme,
  // not via inline styles. Class strings are recombined from the static
  // RADIUS_CLASSES / SIZE_BY_DENSITY maps above (so Tailwind sees them).
  const s = SIZE_BY_DENSITY[density.name];
  const r = RADIUS_CLASSES[radius.name];
  const buttonSmallClass = `${r} ${s.buttonSm}`;
  const buttonMediumClass = `${r} ${s.button}`;
  const customTheme = useMemo(
    () =>
      extendTheme(
        theme,
        {
          components: {
            card: {
              base: r
            },
            chip: {
              base: r,
              sizes: {
                small: s.chipSm,
                medium: s.chip,
                large: s.chip
              }
            },
            button: {
              sizes: {
                small: buttonSmallClass,
                medium: buttonMediumClass,
                large: buttonMediumClass
              }
            },
            input: {
              sizes: {
                small: s.inputSm,
                medium: s.input,
                large: s.input
              }
            },
            toggle: {
              sizes: {
                small: s.toggleSm,
                medium: s.toggle,
                large: s.toggle
              },
              handle: {
                sizes: {
                  small: s.handleSm,
                  medium: s.handle,
                  large: s.handle
                }
              }
            },
            checkbox: {
              // Replace the default `blue-*` hard-codes in the Checkbox theme
              // with our `primary` / `primary-hover` tokens — keeps the
              // checkbox swap-color in sync with the sidebar's Primary swatch.
              border: {
                base: 'group-hover/checkbox:stroke-primary-hover',
                checked: 'stroke-primary'
              },
              checkbox: {
                checked: 'fill-primary group-hover/checkbox:fill-primary-hover'
              },
              label: {
                base: 'group-hover/checkbox:text-primary-hover'
              },
              sizes: {
                small: s.iconSm,
                medium: s.icon,
                large: s.icon
              }
            },
            radio: {
              sizes: {
                small: s.iconSm,
                medium: s.icon,
                large: s.icon
              }
            }
          }
        },
        mergeThemeClasses as (
          objValue: unknown,
          srcValue: unknown,
          key: string
        ) => string
      ),
    [r, s, buttonSmallClass, buttonMediumClass]
  );

  const stageStyle = useMemo<CSSVarStyle>(
    () => ({
      // Reablocks-recognized vars (cascade into reablocks components):
      '--primary': tokens.primary,
      '--primary-active': tokens.primary,
      '--primary-hover': hexToRgba(tokens.primary, 0.85),
      '--primary-inactive': hexToRgba(tokens.primary, 0.4),
      '--secondary': tokens.secondary,
      '--secondary-active': tokens.secondary,
      '--secondary-hover': hexToRgba(tokens.secondary, 0.85),
      '--secondary-inactive': hexToRgba(tokens.secondary, 0.4),
      '--panel': tokens.panel,
      '--panel-accent': tokens['panel-accent'],
      '--text-primary': tokens['text-primary'],
      '--text-secondary': tokens['text-secondary'],

      // Stage-derived vars used by inline Tailwind arbitrary values inside the live code:
      '--rb-stage-primary-soft': hexToRgba(tokens.primary, 0.18),
      '--rb-stage-hairline': hexToRgba(tokens['text-secondary'], 0.16),
      '--rb-stage-radius': `${radius.value}px`,
      '--rb-stage-pad-y': `${density.padY}px`,
      '--rb-stage-pad-x': `${density.padX}px`,
      '--rb-stage-fs': `${density.fs}px`,

      background:
        'color-mix(in srgb, var(--panel-accent) 50%, transparent)',
      color: 'var(--text-primary)',
      transition: 'background 320ms ease, color 320ms ease'
    }),
    [tokens, radius, density]
  );

  const overridesCode = useMemo(() => {
    const KEY_WIDTH = 21; // longest "--secondary-inactive:"
    const entries: Array<[string, string]> = [
      ['--primary', tokens.primary],
      ['--primary-active', tokens.primary],
      ['--primary-hover', hexToRgba(tokens.primary, 0.85)],
      ['--primary-inactive', hexToRgba(tokens.primary, 0.4)],
      ['--secondary', tokens.secondary],
      ['--secondary-active', tokens.secondary],
      ['--secondary-hover', hexToRgba(tokens.secondary, 0.85)],
      ['--secondary-inactive', hexToRgba(tokens.secondary, 0.4)],
      ['--panel', tokens.panel],
      ['--panel-accent', tokens['panel-accent']],
      ['--text-primary', tokens['text-primary']],
      ['--text-secondary', tokens['text-secondary']]
    ];
    const lines = entries
      .map(([k, v]) => `  ${`${k}:`.padEnd(KEY_WIDTH, ' ')}${v};`)
      .join('\n');
    return `/* 🎨 Color tokens — drop into your global stylesheet, or scope to a
   wrapper via [data-theme="app"] / .my-app instead of :root. */

:root {
${lines}
}`;
  }, [tokens]);

  const themeOverrideCode = useMemo(
    () =>
      `import {
  extendTheme,
  mergeThemeClasses,
  theme,
  ThemeProvider,
  type PartialReablocksTheme,
} from 'reablocks';

// 📐 Size / radius — customised via reablocks theme overrides.
//    mergeThemeClasses appends our classes onto each component's defaults
//    instead of replacing them, so existing styling (bg, border, etc.) is
//    preserved while padding / radius / font-size win via tailwind-merge.
//    <ThemeProvider theme={myTheme}><App /></ThemeProvider>

export const myTheme: PartialReablocksTheme = extendTheme(
  theme,
  {
    components: {
      card: {
        base: '${r}',
      },
      chip: {
        base: '${r}',
        sizes: {
          small:  '${s.chipSm}',
          medium: '${s.chip}',
          large:  '${s.chip}',
        },
      },
      button: {
        sizes: {
          small:  '${buttonSmallClass}',
          medium: '${buttonMediumClass}',
          large:  '${buttonMediumClass}',
        },
      },
      input: {
        sizes: {
          small:  '${s.inputSm}',
          medium: '${s.input}',
          large:  '${s.input}',
        },
      },
      toggle: {
        sizes: {
          small:  '${s.toggleSm}',
          medium: '${s.toggle}',
          large:  '${s.toggle}',
        },
        handle: {
          sizes: {
            small:  '${s.handleSm}',
            medium: '${s.handle}',
            large:  '${s.handle}',
          },
        },
      },
      checkbox: {
        border: {
          base:    'group-hover/checkbox:stroke-primary-hover',
          checked: 'stroke-primary',
        },
        checkbox: {
          checked: 'fill-primary group-hover/checkbox:fill-primary-hover',
        },
        label: {
          base: 'group-hover/checkbox:text-primary-hover',
        },
        sizes: {
          small:  '${s.iconSm}',
          medium: '${s.icon}',
          large:  '${s.icon}',
        },
      },
      radio: {
        sizes: {
          small:  '${s.iconSm}',
          medium: '${s.icon}',
          large:  '${s.icon}',
        },
      },
    },
  },
  mergeThemeClasses,
);`,
    [r, s, buttonSmallClass, buttonMediumClass]
  );

  const [codeTab, setCodeTab] = useState<'overrides' | 'theme'>('overrides');
  const activeCode = codeTab === 'overrides' ? overridesCode : themeOverrideCode;
  const activeFile = codeTab === 'overrides' ? 'tokens.css' : 'theme.ts';

  return (
    <section
      className="relative -top-6 py-24 max-[720px]:py-16 max-[640px]:py-12 overflow-hidden"
      id="theme-studio"
      aria-labelledby="theme-studio-heading"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-6 w-[1000px] h-[600px] -translate-x-1/2 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(16,94,255,0.18), transparent 70%)'
        }}
      />
      <div className="relative z-[1] w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
        <SectionHead
          headingId="theme-studio-heading"
          title={
            <>
              Reablocks themes are{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                objects you extend
              </span>
              , not files you rewrite.
            </>
          }
          lede="Tailwind tokens for color, type, and radius. Merge your overrides with extendTheme, distribute via ThemeProvider, or pass a per-component theme prop. Dark and light variants ship by default."
        />

        <div className="grid grid-cols-[260px_1fr] gap-[22px] max-[900px]:grid-cols-1">
          {/* Sidebar */}
          <aside className="self-start sticky top-20 max-[900px]:static p-[14px] rb-ring rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_28px_-12px_rgba(0,0,0,0.6)]">
            <div className="inline-flex p-[3px] bg-white/[0.04] border border-rb-hairline rounded-lg w-full">
              {TABS.map((t) => {
                const selected = tab === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={cn(
                      'flex-1 px-2.5 py-1.5 font-sans text-[12.5px] rounded-md cursor-pointer transition-colors',
                      selected
                        ? 'bg-white/[0.09] text-white'
                        : 'bg-transparent text-rb-fg-3 hover:text-white'
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 min-h-[188px] flex flex-col gap-3">
              {tab !== 'Layout' &&
                TAB_TOKENS[tab].map((k) => (
                  <TokenRow
                    key={k}
                    name={k}
                    value={tokens[k]}
                    swatches={PRESETS[k]}
                    onChange={setToken(k)}
                  />
                ))}
              {tab === 'Layout' && (
                <>
                  <Segment
                    label="Radius"
                    options={RADIUS}
                    value={radius.name}
                    onChange={(name) =>
                      setRadius(
                        RADIUS.find((r) => r.name === name) ?? RADIUS[1]
                      )
                    }
                    render={(o, selected) => {
                      const r = RADIUS.find((x) => x.name === o.name)!;
                      return (
                        <>
                          <span
                            className="w-3.5 h-3.5 inline-block bg-gradient-to-br from-cyan-300 to-blue-400"
                            style={{ borderRadius: r.iconR }}
                          />
                          <span className={selected ? '' : 'opacity-90'}>
                            {o.name}
                          </span>
                        </>
                      );
                    }}
                  />
                  <Segment
                    label="Density"
                    options={DENSITY}
                    value={density.name}
                    onChange={(name) =>
                      setDensity(
                        DENSITY.find((d) => d.name === name) ?? DENSITY[1]
                      )
                    }
                  />
                </>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-dashed border-rb-hairline flex items-center justify-end">
              <button
                type="button"
                onClick={reset}
                className="font-mono text-[10.5px] tracking-[0.04em] text-rb-fg-2 hover:text-white cursor-pointer bg-transparent border-0 p-0"
              >
                Reset
              </button>
            </div>
          </aside>

          {/* Stage — react-live-runner preview wired to the host CSS vars */}
          <div
            className="min-h-[480px] p-[22px] rb-ring-overlay rounded-[22px] max-[640px]:p-3 max-[640px]:min-h-[420px] overflow-hidden max-[640px]:overflow-x-auto"
            style={stageStyle}
          >
            <ThemeProvider theme={customTheme}>
              <LiveProvider code={LIVE_CODE} scope={liveScope}>
                <LivePreview />
                <LiveError className="mt-3 text-xs font-mono text-red-300 px-3 py-2 rounded-md bg-red-950/40 border border-red-900/40" />
              </LiveProvider>
            </ThemeProvider>
          </div>
        </div>

        {/* Generated theme code — two tabs: CSS overrides and reablocks theme override */}
        <div
          className="mt-[22px] rb-ring rounded-[22px] overflow-hidden"
          style={{ ['--rb-ring-fill' as string]: '#0E0F1B' } as CSSProperties}
        >
          <div className="px-[12px] py-2 border-b border-rb-hairline bg-black/[0.18] flex items-center gap-1.5">
            <div className="inline-flex p-[3px] bg-white/[0.04] border border-rb-hairline rounded-lg">
              {(
                [
                  ['overrides', 'CSS Tokens'],
                  ['theme', 'Theme Override']
                ] as const
              ).map(([key, label]) => {
                const selected = codeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCodeTab(key)}
                    className={cn(
                      'px-3 py-1.5 font-sans text-[12.5px] rounded-md cursor-pointer transition-colors',
                      selected
                        ? 'bg-white/[0.09] text-white'
                        : 'bg-transparent text-rb-fg-3 hover:text-white'
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <span className="ml-2 font-mono text-[11px] tracking-[0.08em] uppercase text-rb-fg-3">
              {activeFile}
            </span>
            <span className="ml-auto">
              <CopyButton getText={() => activeCode} label="Copy" />
            </span>
          </div>
          <div className="max-h-[520px] overflow-auto">
            <CodeBlock code={activeCode} />
          </div>
        </div>
      </div>
    </section>
  );
};
