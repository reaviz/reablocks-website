'use client';

import { CSSProperties, FC, useMemo, useState } from 'react';
import { cn } from '@/utils/cn';
import { CopyButton, Icon, buttonClass } from '@/components/main/landing/atoms';
import { frameworkList, type FrameworkId } from './recipes';
import { buildInstallPrompt } from './build-prompt';

type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>;

/**
 * "Install with AI" tab: pick a framework, get a self-contained, paste-ready
 * prompt that drives an AI agent through the same setup `reablocks-cli` performs.
 */
export const InstallPromptBuilder: FC = () => {
  const [selected, setSelected] = useState<FrameworkId>('next');
  const recipe =
    frameworkList.find(r => r.id === selected) ?? frameworkList[0];
  const prompt = useMemo(() => buildInstallPrompt(recipe), [recipe]);

  return (
    <div className="my-6 flex flex-col gap-4">
      <div
        role="radiogroup"
        aria-label="Choose your framework"
        className="grid grid-cols-3 gap-3 max-[640px]:grid-cols-1"
      >
        {frameworkList.map(fw => {
          const active = fw.id === selected;
          return (
            <button
              key={fw.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(fw.id)}
              className={cn(
                'cursor-pointer rounded-[14px] border px-4 py-3 text-left transition-colors duration-150',
                active
                  ? 'border-blue-500 bg-blue-500/[0.08]'
                  : 'border-rb-hairline-2 bg-white/[0.02] hover:border-rb-hairline-strong hover:bg-white/[0.05]'
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border',
                    active ? 'border-blue-400' : 'border-rb-hairline-strong'
                  )}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  )}
                </span>
                <span className="text-sm font-medium text-rb-fg-1">
                  {fw.label}
                </span>
              </span>
              <span className="mt-1 ml-[22px] block font-mono text-[11px] text-rb-fg-3">
                {fw.tagline}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="rb-ring overflow-hidden rounded-[18px]"
        style={{ '--rb-ring-fill': '#0B0C18' } as CSSVarStyle}
      >
        <div className="flex items-center gap-3 border-b border-rb-hairline bg-white/[0.02] px-4 py-2.5">
          <span className="font-mono text-xs text-rb-fg-2">
            Prompt · <span className="text-white">{recipe.label}</span>
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <CopyButton getText={() => prompt} label="Copy prompt" />
            <a
              href={`/install-prompt/${recipe.id}`}
              target="_blank"
              rel="noreferrer"
              className={buttonClass('ghost', 'sm')}
            >
              <Icon.doc />
              View as Markdown
            </a>
          </span>
        </div>

        <pre className="m-0 max-h-[460px] overflow-auto whitespace-pre-wrap bg-transparent px-5 py-4 font-mono text-[12.5px] leading-[1.6] text-rb-fg-2 max-[640px]:px-3.5 max-[640px]:py-3.5 max-[640px]:text-[12px]">
          {prompt}
        </pre>

        <p className="border-t border-rb-hairline bg-white/[0.01] px-5 py-2.5 text-[11px] text-rb-fg-3">
          Paste into Claude Code, Cursor, or any AI coding agent. Produces the
          same setup as{' '}
          <code className="font-mono text-rb-fg-2">
            npx reablocks-cli@latest init
          </code>{' '}
          for {recipe.label}.
        </p>
      </div>
    </div>
  );
};
