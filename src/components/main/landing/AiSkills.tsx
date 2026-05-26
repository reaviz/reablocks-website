'use client';

import { FC } from 'react';
import { CopyButton, CSSVarStyle, Icon, SectionHead } from './atoms';

const COMPAT = [
  { name: 'Claude Code', color: '#D97757' },
  { name: 'Cursor', color: '#FFFFFF' },
  { name: 'OpenClaw', color: '#A78BFA' }
];

export const AiSkills: FC = () => {
  const cmd = 'npx skills add reaviz/skills';
  return (
    <section
      className="relative -top-6 py-24 max-[720px]:py-16 max-[640px]:py-12 overflow-hidden"
      id="ai"
      aria-labelledby="ai-heading"
    >
      {/* Cyan halo behind section */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-6 w-[1100px] h-[600px] -translate-x-1/2 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 20%, rgba(128,226,248,0.10), transparent 70%)'
        }}
      />
      <div className="relative z-[1] w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
        <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start max-[980px]:grid-cols-1 max-[980px]:gap-9">
          <div>
            <div className="[&_.rb-section-head]:mb-6">
              <SectionHead
                headingId="ai-heading"
                title={
                  <>
                    Your agents{' '}
                    <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                      already know
                    </span>{' '}
                    Reablocks.
                  </>
                }
                lede="Every component ships with a machine-readable Skill: prop schema, usage examples, theming recipes, and prebuilt blocks. Claude, Cursor, and Copilot pull them on demand - your prompts ship working pages, not pseudo-code."
              />
            </div>

            <div className="relative max-w-[460px] w-full bg-white/[0.03] rb-ring-overlay rounded-xl [backdrop-filter:blur(8px)]">
              <div className="flex items-center gap-0.5 p-1 border-b border-rb-hairline bg-transparent relative z-[1]">
                <span className="font-mono text-xs px-3.5 py-1.5 rounded-md bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_var(--color-rb-hairline-2)]">
                  install skill pack
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 pl-3.5 relative z-[1]">
                <span className="font-mono text-[13.5px] text-cyan-400 select-none">
                  $
                </span>
                <code className="font-mono text-[13.5px] inline-flex items-baseline whitespace-nowrap">
                  <span className="text-white font-medium">npx</span>
                  <span className="text-rb-fg-3">&nbsp;skills add&nbsp;</span>
                  <span className="text-cyan-300">reaviz/skills</span>
                </code>
                <span className="ml-auto">
                  <CopyButton getText={() => cmd} />
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-[22px]">
              <span className="font-mono text-[11px] text-rb-fg-3 uppercase tracking-[0.14em] mr-1">
                Works with
              </span>
              {COMPAT.map((t) => (
                <span
                  key={t.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-rb-hairline-2 rounded-full text-[12.5px] text-rb-fg-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: t.color,
                      boxShadow: `0 0 10px ${t.color}66`
                    }}
                  />
                  {t.name}
                </span>
              ))}
              <span className="inline-flex items-center px-2.5 py-1 bg-white/[0.02] border border-dashed border-rb-hairline-2 rounded-full text-[12.5px] text-rb-fg-3">
                +30 more
              </span>
            </div>

            <ul className="list-none p-0 mt-6 grid gap-2.5">
              {[
                {
                  text: (
                    <>
                      Component prop schemas exported as{' '}
                      <code className="font-mono text-[0.9em] text-cyan-300 bg-[rgba(0,197,240,0.07)] px-1.5 py-px rounded border border-[rgba(0,197,240,0.18)]">
                        .skill.json
                      </code>
                    </>
                  )
                },
                {
                  text: (
                    <>
                      Block templates with intent labels (
                      <code className="font-mono text-[0.9em] text-cyan-300 bg-[rgba(0,197,240,0.07)] px-1.5 py-px rounded border border-[rgba(0,197,240,0.18)]">
                        pricing.toggle
                      </code>
                      ,{' '}
                      <code className="font-mono text-[0.9em] text-cyan-300 bg-[rgba(0,197,240,0.07)] px-1.5 py-px rounded border border-[rgba(0,197,240,0.18)]">
                        auth.mfa
                      </code>
                      )
                    </>
                  )
                },
                { text: 'Theme recipes — agents extend, never reinvent' }
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 items-start text-rb-fg-2 text-sm leading-[1.5]"
                >
                  <span className="w-[18px] h-[18px] rounded-full bg-[rgba(74,222,128,0.18)] text-rb-good inline-flex items-center justify-center shrink-0 mt-px">
                    <Icon.check />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terminal */}
          <div>
            <div
              className="rb-ring rounded-[22px] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_-30px_rgba(0,0,0,0.7)] font-mono"
              style={{ '--rb-ring-fill': '#0B0C18' } as CSSVarStyle}
            >
              <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-rb-hairline bg-white/[0.02]">
                <span className="inline-flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </span>
                <span className="font-mono text-xs text-rb-fg-3 ml-1">
                  ~/myapp · claude
                </span>
                <span className="ml-auto font-mono text-[10.5px] tracking-[0.06em] uppercase px-2 py-0.5 bg-[rgba(74,222,128,0.12)] text-rb-good border border-[rgba(74,222,128,0.28)] rounded-full">
                  live
                </span>
              </div>
              <div className="p-4 px-4 text-[13px] leading-[1.6] text-rb-fg-2 flex flex-col gap-1 min-h-[360px] max-[640px]:text-[12px] max-[640px]:p-3 max-[640px]:min-h-[320px] overflow-x-auto">
                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-cyan-300 mt-0.5">
                    $
                  </span>
                  <code className="font-mono inline-flex items-baseline whitespace-nowrap">
                    <span className="text-white font-medium">npx</span>
                    <span className="text-rb-fg-3">&nbsp;skills add&nbsp;</span>
                    <span className="text-cyan-300">reaviz/skills</span>
                  </code>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-rb-good mt-0.5">
                    <Icon.check />
                  </span>
                  <span>
                    installed{' '}
                    <em className="not-italic text-rb-fg-2">reaviz/skills</em>{' '}
                    · 47 components · 12 recipes
                  </span>
                </div>

                <div
                  aria-hidden="true"
                  className="h-px my-1.5 ml-7 bg-gradient-to-r from-rb-hairline-2 to-transparent"
                />

                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-cyan-300 mt-0.5">
                    $
                  </span>
                  <span className="text-rb-fg-1">
                    claude &quot;Add ⌘K command palette with recent files + theme switch&quot;
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-rb-fg-muted mt-0.5">
                    »
                  </span>
                  <span>
                    reading <em className="not-italic text-rb-fg-2">reaviz/skills</em>…
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-rb-good mt-0.5">
                    <Icon.check />
                  </span>
                  <span>
                    matched{' '}
                    <em className="not-italic text-blue-300 font-medium">
                      CommandPalette
                    </em>{' '}
                    · fuzzy search · keyboard nav
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-rb-good mt-0.5">
                    <Icon.check />
                  </span>
                  <span>
                    matched{' '}
                    <em className="not-italic text-blue-300 font-medium">
                      Kbd
                    </em>{' '}
                    · ⌘K shortcut display
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-rb-good mt-0.5">
                    <Icon.check />
                  </span>
                  <span>
                    matched{' '}
                    <em className="not-italic text-blue-300 font-medium">
                      useTheme
                    </em>{' '}
                    · light/dark switching
                  </span>
                </div>

                <div
                  aria-hidden="true"
                  className="h-px my-1.5 ml-7 bg-gradient-to-r from-rb-hairline-2 to-transparent"
                />

                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-blue-300 mt-0.5">
                    <Icon.packageBox />
                  </span>
                  <span>
                    wrote <em className="not-italic text-white">src/components/AppPalette.tsx</em>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-rb-fg-3 text-[12.5px]">
                  <span className="w-[18px] shrink-0" />
                  <span>
                    62 lines · 4 imports from{' '}
                    <em className="not-italic text-rb-fg-2">reablocks</em> · 0
                    type errors
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-rb-fg-3 text-[12.5px]">
                  <span className="w-[18px] shrink-0" />
                  <span>
                    <code className="font-mono text-[0.9em] text-cyan-300 bg-[rgba(0,197,240,0.07)] px-1.5 py-px rounded border border-[rgba(0,197,240,0.18)]">
                      {`import { CommandPalette, Kbd, Divider, useTheme } from 'reablocks'`}
                    </code>
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-[18px] shrink-0 inline-flex items-start text-cyan-300 mt-0.5">
                    $
                  </span>
                  <span className="inline-block w-[7px] h-3.5 bg-cyan-300 motion-safe:animate-rb-caret align-middle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
