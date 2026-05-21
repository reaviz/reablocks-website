'use client';

import { cn } from '@/utils/cn';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Calendar,
  Checkbox,
  CommandPalette,
  CommandPaletteItem,
  CommandPaletteSection,
  Divider,
  extendTheme,
  IconButton,
  JsonTree,
  Kbd,
  PAST_RANGE_PRESETS,
  Radio,
  RadioGroup,
  RangeDouble,
  Step,
  Stepper,
  theme,
  ThemeProvider
} from 'reablocks';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import { Icon, SectionHead } from './atoms';

// ============================================================
// Theme overrides — keep reablocks defaults, but tune the
// Kbd chip used for command-palette hotkeys so its background
// matches the surrounding landing-page design (subtle
// white-tinted surface + hairline border).
// ============================================================
const landingTheme = extendTheme(theme, {
  components: {
    chip: {
      colors: {
        default: {
          variants: {
            filled:
              'bg-white/[0.06] border-rb-hairline-2 text-rb-fg-2 shadow-[inset_0_-1px_0_var(--color-rb-hairline-2)]'
          }
        }
      }
    },
    kbd: {
      chip: 'whitespace-nowrap rounded-md font-mono text-rb-fg-2'
    },
    commandPalette: {
      // Flatten the bottom corners + drop the bottom border so the
      // navigation footer below sits flush against the palette. Use a
      // transparent fill so the bento's own surface shows through.
      base: 'w-full bg-transparent border border-rb-hairline-2 rounded-t-md rounded-b-none border-b-0',
      inner: 'max-h-[80vh] overflow-y-auto bg-transparent border-0',
      // CommandPaletteInput defaults to bg-panel (a hard dark fill);
      // override to transparent + landing fg tokens so the search row
      // blends with the surrounding bento surface.
      input: {
        base: 'flex w-full items-center border-b border-rb-hairline bg-transparent',
        input:
          'flex-1 border-0 box-border p-2.5 bg-transparent text-rb-fg-1 placeholder:text-rb-fg-3 outline-none focus-within:outline-hidden focus-visible:outline-hidden',
        icon: 'w-4 h-4 ml-2.5 text-rb-fg-3'
      },
      // Sections also default to bg-panel — make them transparent so
      // the bento shows through.
      section: {
        base: 'bg-transparent'
      },
      // Item visuals: match the landing's soft-blue accent for active
      // state (instead of the default solid `bg-primary`), and let the
      // List hover (overridden below) handle the hover state.
      item: {
        base: 'transition-colors ease-in-out duration-200 rounded-md mx-1',
        active:
          'bg-blue-500/[0.16] text-white shadow-[inset_0_0_0_1px_rgba(16,94,255,0.32)]',
        clickable: 'cursor-pointer'
      }
    },
    // ListItem (used by CommandPaletteItem internally) defaults to a
    // dark `bg-panel-accent` hover. Soft white tint matches the landing.
    list: {
      listItem: {
        base: 'items-center flex p-2.5 relative rounded-md text-rb-fg-1 hover:bg-white/[0.05] hover:text-white'
      }
    },
    // Make the Calendar's preset / time side-panels transparent so the
    // component blends into the landing bento instead of showing a
    // hard dark fill.
    calendar: {
      presets: {
        wrapper: 'bg-transparent z-10'
      },
      time: {
        wrapper: 'mt-4 bg-transparent z-10 flex flex-row'
      }
    }
  }
});

// ============================================================
// 1. CommandPalette  — real `reablocks/CommandPalette` w/ hotkeys
// ============================================================
const CommandPaletteFooter: FC = () => (
  <div className="flex items-center gap-4 px-3.5 py-2 border border-rb-hairline-2 rounded-b-md text-[11px] text-rb-fg-3">
    <span className="inline-flex items-center gap-1.5">
      <Kbd keycode="↑" />
      <Kbd keycode="↓" /> navigate
    </span>
    <span className="self-stretch w-px bg-white/25" aria-hidden="true" />
    <span className="inline-flex items-center gap-1.5">
      <Kbd keycode="↵" /> select
    </span>
    <span className="self-stretch w-px bg-white/25" aria-hidden="true" />
    <span className="inline-flex items-center gap-1.5">
      <Kbd keycode="esc" /> close
    </span>
  </div>
);

// Flat list of palette items in the same order they render. Selection
// is index-based, so the index here drives both click + hotkey + Enter.
interface PaletteItem {
  group: 'Components' | 'Actions';
  label: string;
  hotkey?: string;
  url: string;
  icon: ReactNode;
}

const PALETTE_ITEMS: PaletteItem[] = [
  {
    group: 'Components',
    label: 'Button',
    hotkey: 'meta+b',
    url: '/docs/components/elements/button',
    icon: <Icon.packageBox />
  },
  {
    group: 'Components',
    label: 'Calendar Range',
    hotkey: 'meta+r',
    url: '/docs/components/form/calendar',
    icon: <Icon.packageBox />
  },
  {
    group: 'Components',
    label: 'CommandPalette',
    hotkey: 'meta+k',
    url: '/docs/components/elements/command-palette',
    icon: <Icon.packageBox />
  },
  {
    group: 'Actions',
    label: 'Open Storybook',
    hotkey: 'meta+s',
    url: 'https://storybook.reablocks.dev',
    icon: <Icon.bolt />
  },
  {
    group: 'Actions',
    label: 'Open Docs',
    hotkey: 'meta+d',
    url: '/docs',
    icon: <Icon.doc />
  }
];

const openItem = (index: number) => {
  const item = PALETTE_ITEMS[index];
  if (!item) return;
  window.open(item.url, '_blank', 'noopener,noreferrer');
};

const CommandPaletteCell: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Window listener (capture phase) — runs before the browser's
  // default arrow-key scroll. We only block when focus is inside
  // the palette; the mouse-enter handler below moves focus into the
  // input so hovering also counts as "active".
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      if (wrapper.contains(document.activeElement)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler, { capture: true });
    return () =>
      window.removeEventListener('keydown', handler, { capture: true });
  }, []);

  // reablocks' CommandPalette calls `scrollIntoView()` (no options)
  // on the active item whenever selection changes — that walks every
  // scrollable ancestor and pulls the *page* along with it. Patch the
  // items' scrollIntoView to use `{block: 'nearest'}` so only the
  // palette's own inner list scrolls.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const patch = () => {
      const items =
        wrapper.querySelectorAll<HTMLElement>('[keyboard_index]');
      items.forEach((el) => {
        type Patched = HTMLElement & { __scrollPatched?: boolean };
        const node = el as Patched;
        if (node.__scrollPatched) return;
        const original = node.scrollIntoView.bind(node);
        node.scrollIntoView = ((arg?: boolean | ScrollIntoViewOptions) => {
          const opts =
            typeof arg === 'object' && arg !== null
              ? { block: 'nearest', inline: 'nearest', ...arg }
              : { block: 'nearest', inline: 'nearest' };
          original(opts as ScrollIntoViewOptions);
        }) as HTMLElement['scrollIntoView'];
        node.__scrollPatched = true;
      });
    };
    patch();
    const observer = new MutationObserver(patch);
    observer.observe(wrapper, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const focusInput = () => {
    const input =
      wrapperRef.current?.querySelector<HTMLInputElement>('input');
    // `preventScroll` so the page doesn't jump to the palette when
    // the pointer first enters it.
    input?.focus({ preventScroll: true });
  };

  const blurInput = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && wrapperRef.current?.contains(active)) {
      active.blur();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="flex-1 flex flex-col"
      onMouseEnter={focusInput}
      onMouseLeave={blurInput}
    >
    <CommandPalette
      autoFocus={false}
      placeholder="Search components, blocks, actions…"
      emptyMessage="No results."
      // Fires for both click and Enter on the active item.
      onSelectedIndexChange={openItem}
      onHotkey={(item) => openItem(item.index)}
    >
      <CommandPaletteSection title="Components" key="components">
        {PALETTE_ITEMS.filter((i) => i.group === 'Components').map((i) => (
          <CommandPaletteItem
            key={i.label}
            start={i.icon}
            hotkey={i.hotkey}
          >
            {i.label}
          </CommandPaletteItem>
        ))}
      </CommandPaletteSection>
      <Divider />
      <CommandPaletteSection title="Actions" key="actions">
        {PALETTE_ITEMS.filter((i) => i.group === 'Actions').map((i) => (
          <CommandPaletteItem
            key={i.label}
            start={i.icon}
            hotkey={i.hotkey}
          >
            {i.label}
          </CommandPaletteItem>
        ))}
      </CommandPaletteSection>
    </CommandPalette>
    <CommandPaletteFooter />
  </div>
  );
};

// ============================================================
// 2. Calendar  — real `reablocks/Calendar` (single date + presets)
// ============================================================
// Trim the preset list to the most common short-window options so it
// fits the bento tile.
const RANGE_PRESETS = PAST_RANGE_PRESETS.slice(0, 7);

// Matches the "Last 7 Days" preset from PAST_RANGE_PRESETS so the
// preset shows as active on first render.
const last7Days = (): [Date, Date] => [
  startOfDay(subDays(new Date(), 6)),
  endOfDay(new Date())
];

const CalendarCell: FC = () => {
  const [range, setRange] = useState<[Date, Date] | undefined>(() =>
    last7Days()
  );
  return (
    <div className="flex-1 flex flex-col justify-center">
      {/* Mirror the CommandPalette container: bordered top section
          holding the calendar, joined footer with the date readout. */}
      <div className="mx-auto w-auto flex flex-col">
        <div className="border border-rb-hairline-2 rounded-t-md border-b-0 p-3">
          <Calendar
            isRange
            value={range}
            onChange={(val) => setRange(val as [Date, Date])}
            showDayOfWeek
            showToday
            showTime
            preset={RANGE_PRESETS}
          />
        </div>
        <div className="flex items-center justify-center px-3.5 py-2 border border-t-0 border-rb-hairline-2 rounded-b-md text-[11px] text-rb-fg-3 font-mono">
          {range?.[0] && range?.[1]
            ? `${format(range[0], 'yyyy-MM-dd')} → ${format(range[1], 'yyyy-MM-dd')}`
            : 'No date selected'}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 3. JsonTree  — real `reablocks/JsonTree`
// ============================================================
const SAMPLE_JSON = {
  request_id: 'req_8h2A9bX',
  status: 'ok',
  user: {
    id: 142,
    email: 'jordan@acme.com',
    name: 'Jordan Chen',
    role: 'admin',
    permissions: ['read', 'write', 'deploy']
  },
  meta: {
    plan: 'enterprise',
    seats: 24,
    region: 'us-east-1',
    flags: { beta_ui: true, ai_search: false }
  },
  timings_ms: [12, 38, 7, 91]
};

const JsonTreeCell: FC = () => (
  <div className="flex-1 flex flex-col bg-black/[0.25] border border-rb-hairline rounded-xl overflow-hidden">
    <div className="flex items-center gap-2.5 px-3 py-2 border-b border-rb-hairline">
      <span className="font-mono text-rb-fg-3 text-xs">GET /api/v1/me</span>
      <span className="ml-auto inline-flex items-center gap-1.5 bg-blue-500/[0.12] text-blue-300 border border-blue-500/[0.28] text-[11.5px] font-medium px-2 py-0.5 rounded-full font-sans">
        200 OK
      </span>
    </div>
    <div className="flex-1 overflow-auto px-2.5 py-2 text-xs">
      <JsonTree data={SAMPLE_JSON} expandDepth={2} />
    </div>
  </div>
);

// ============================================================
// 4. Stepper  — real `reablocks/Stepper` (animated timeline)
// ============================================================
const StepperCell: FC = () => (
  <div className="flex-1 flex flex-col">
    <Stepper animated activeStep={2}>
      <Step>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-rb-fg-3 font-mono">
            Mar 1 · 8:14 AM
          </span>
          <span className="text-sm">
            Austin{' '}
            <span className="text-rb-fg-3">opened</span> RBK-184{' '}
            <span className="text-rb-fg-3">·</span> Add CommandPalette hotkeys
          </span>
        </div>
      </Step>
      <Step>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-rb-fg-3 font-mono">
            Mar 1 · 10:42 AM
          </span>
          <span className="text-sm">
            Jordan{' '}
            <span className="text-rb-fg-3">moved</span> Backlog{' '}
            <span className="text-rb-fg-3">→</span> In Progress
          </span>
          <div className="px-2.5 py-1.5 border border-blue-700 bg-rb-surface-2 rounded-md text-xs text-rb-fg-2">
            Scope looks good — let&apos;s also wire ⌘K to open the palette.
          </div>
        </div>
      </Step>
      <Step>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-rb-fg-3 font-mono">
            Mar 2 · 4:08 PM
          </span>
          <span className="text-sm">
            Austin{' '}
            <span className="text-rb-fg-3">merged</span> #284{' '}
            <span className="text-rb-fg-3">·</span> In Progress{' '}
            <span className="text-rb-fg-3">→</span> Done
          </span>
        </div>
      </Step>
    </Stepper>
  </div>
);

// ============================================================
// 5. Buttons  — Button variants
// ============================================================
const ButtonsRow: FC<{ label: string; children: ReactNode }> = ({
  label,
  children
}) => (
  <div className="flex items-center gap-3">
    <span className="w-14 shrink-0 text-[10px] text-rb-fg-3 font-mono uppercase tracking-[0.08em]">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-1.5">{children}</div>
  </div>
);

const ButtonsCell: FC = () => (
  <div className="flex-1 flex flex-col gap-2.5 justify-center">
    <ButtonsRow label="Filled">
      <Button size="medium" color="primary">Primary</Button>
      <Button size="medium" color="secondary">Secondary</Button>
      <Button size="medium" color="success">Success</Button>
      <Button size="medium" color="warning">Warning</Button>
      <Button size="medium" color="error">Error</Button>
    </ButtonsRow>
    <ButtonsRow label="Outline">
      <Button size="medium" variant="outline" color="primary">Primary</Button>
      <Button size="medium" variant="outline" color="secondary">Secondary</Button>
      <Button size="medium" variant="outline" color="success">Success</Button>
      <Button size="medium" variant="outline" color="warning">Warning</Button>
      <Button size="medium" variant="outline" color="error">Error</Button>
    </ButtonsRow>
    <ButtonsRow label="Text">
      <Button size="medium" variant="text" color="primary">Primary</Button>
      <Button size="medium" variant="text" color="secondary">Secondary</Button>
      <Button size="medium" variant="text" color="success">Success</Button>
      <Button size="medium" variant="text" color="warning">Warning</Button>
      <Button size="medium" variant="text" color="error">Error</Button>
    </ButtonsRow>
    <ButtonsRow label="Icon">
      <IconButton size="medium" variant="filled" color="primary" aria-label="Notifications">
        <Icon.bell />
      </IconButton>
      <IconButton size="medium" variant="filled" color="success" aria-label="Bolt">
        <Icon.bolt />
      </IconButton>
      <IconButton size="medium" variant="outline" color="primary" aria-label="Star">
        <Icon.star />
      </IconButton>
      <IconButton size="medium" variant="outline" color="warning" aria-label="Settings">
        <Icon.settings />
      </IconButton>
      <IconButton size="medium" variant="text" color="primary" aria-label="Copy">
        <Icon.copy />
      </IconButton>
      <IconButton size="medium" variant="text" color="error" aria-label="Close">
        <Icon.x />
      </IconButton>
    </ButtonsRow>
  </div>
);

// ============================================================
// 6. Inputs  — Checkbox + RadioGroup + RangeDouble
// ============================================================
const InputsCell: FC = () => {
  const [checks, setChecks] = useState({
    accessible: true,
    treeshake: true,
    themed: false
  });
  const [framework, setFramework] = useState('react');
  const [price, setPrice] = useState<[number, number]>([20, 70]);

  return (
    <div className="flex-1 flex flex-col gap-4 justify-center">
      <div>
        <div className="text-[11px] text-rb-fg-3 font-mono uppercase tracking-[0.08em] mb-2">
          Features
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {/* Checkbox's theme base sets `w-full`, which would stack each
              item onto its own row inside a flex container. Override
              with `w-auto` so they sit horizontally. */}
          <Checkbox
            checked={checks.accessible}
            label="Accessible"
            containerClassName="w-auto"
            onChange={(v) => setChecks((c) => ({ ...c, accessible: v }))}
          />
          <Checkbox
            checked={checks.treeshake}
            label="Tree-shakable"
            containerClassName="w-auto"
            onChange={(v) => setChecks((c) => ({ ...c, treeshake: v }))}
          />
          <Checkbox
            checked={checks.themed}
            label="Themed"
            containerClassName="w-auto"
            onChange={(v) => setChecks((c) => ({ ...c, themed: v }))}
          />
        </div>
      </div>
      <div>
        <div className="text-[11px] text-rb-fg-3 font-mono uppercase tracking-[0.08em] mb-2">
          Framework
        </div>
        <RadioGroup onChange={setFramework} selectedValue={framework}>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            <Radio value="react" label="React" />
            <Radio value="vue" label="Vue" />
            <Radio value="svelte" label="Svelte" />
            <Radio value="solid" label="Solid" />
          </div>
        </RadioGroup>
      </div>
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[11px] text-rb-fg-3 font-mono uppercase tracking-[0.08em]">
            Price range
          </span>
          <span className="text-xs text-rb-fg-2 font-mono">
            ${price[0]} – ${price[1]}
          </span>
        </div>
        <RangeDouble
          min={0}
          max={100}
          value={price}
          onChange={([min, max]) => setPrice([min, max])}
          className="w-full"
        />
      </div>
    </div>
  );
};

// ============================================================
// Bento container
// ============================================================
const BODY_MIN: Record<'tall' | 'med' | 'sm', string> = {
  tall: 'min-h-[420px]',
  med: 'min-h-[260px]',
  sm: 'min-h-[260px]'
};

const Bento: FC<{
  title: string;
  docHref?: string;
  size?: 'tall' | 'med';
  children: ReactNode;
}> = ({ title, docHref, size, children }) => (
  <div className="rb-ring rb-ring--glow group relative flex flex-col overflow-hidden rounded-[22px] transition-[transform] duration-200 hover:-translate-y-0.5">
    <div className={cn('p-[18px] overflow-hidden flex', BODY_MIN[size || 'sm'])}>
      {children}
    </div>
    <div className="flex items-center justify-between px-3.5 pb-3 pt-2.5 border-t border-rb-hairline">
      <span className="font-mono text-xs text-rb-fg-3">{title}</span>
      {docHref ? (
        <a
          href={docHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-blue-200"
        >
          → Docs
        </a>
      ) : null}
    </div>
  </div>
);

export const Showcase: FC = () => {
  const themeMemo = useMemo(() => landingTheme, []);
  return (
    <ThemeProvider theme={themeMemo}>
      <section className="py-24 max-[720px]:py-16" id="showcase">
        <div className="w-full max-w-[1240px] mx-auto px-7">
          <SectionHead
            title="Every section on this page is a real component."
            lede="No screenshots. No iframes. Type, click, drag. The same primitives ship with the package."
          />
          {/* Small intro row of compact "primitives" tiles. */}
          <div className="grid grid-cols-2 gap-[18px] items-start max-[620px]:grid-cols-1 mb-[18px]">
            <Bento
              title="Button"
              docHref="/docs/components/elements/button"
            >
              <ButtonsCell />
            </Bento>
            <Bento
              title="Checkbox · Radio · Range"
              docHref="/docs/components/form/checkbox"
            >
              <InputsCell />
            </Bento>
          </div>
          <div className="grid grid-cols-2 gap-[18px] items-start max-[620px]:grid-cols-1">
            <div className="flex flex-col gap-[18px] min-w-0">
              <Bento
                title="CommandPalette"
                size="tall"
                docHref="/docs/components/elements/command-palette"
              >
                <CommandPaletteCell />
              </Bento>
              <Bento
                title="JsonTree"
                size="med"
                docHref="/docs/components/layout/json-tree"
              >
                <JsonTreeCell />
              </Bento>
            </div>
            <div className="flex flex-col gap-[18px] min-w-0">
              <Bento
                title="Calendar"
                size="tall"
                docHref="/docs/components/form/calendar"
              >
                <CalendarCell />
              </Bento>
              <Bento
                title="Stepper"
                size="med"
                docHref="/docs/components/layout/stepper"
              >
                <StepperCell />
              </Bento>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};
