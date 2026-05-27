'use client';

import { CSSProperties, FC, ReactNode } from 'react';

type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>;

export const InstallTerminal: FC = () => (
  <div
    className="rb-ring rounded-[22px] overflow-hidden font-mono my-6"
    style={{ '--rb-ring-fill': '#0B0C18' } as CSSVarStyle}
  >
    <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-rb-hairline bg-white/[0.02]">
      <span className="inline-flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </span>
      <span className="font-mono text-xs text-rb-fg-3 ml-1">
        ~/myapp · reablocks-cli
      </span>
      <span className="ml-auto font-mono text-[10.5px] tracking-[0.06em] uppercase px-2 py-0.5 bg-[rgba(74,222,128,0.12)] text-rb-good border border-[rgba(74,222,128,0.28)] rounded-full">
        live
      </span>
    </div>
    <div className="p-4 text-[13px] leading-[1.6] text-rb-fg-2 flex flex-col gap-1 overflow-x-auto max-[640px]:text-[12px] max-[640px]:p-3">
      <PromptLine>
        <code className="font-mono inline-flex items-baseline whitespace-nowrap">
          <span className="text-white font-medium">npx</span>
          <span className="text-rb-fg-3">
            &nbsp;reablocks-cli@latest&nbsp;
          </span>
          <span className="text-cyan-300">init</span>
        </code>
      </PromptLine>

      <Spacer />

      <PlainLine>This command assumes a React project.</PlainLine>
      <PlainLine>
        If you don&apos;t have these, follow the manual steps at{' '}
        <span className="text-cyan-300">
          https://reablocks.dev/docs/getting-started/setup
        </span>
      </PlainLine>

      <Spacer />

      <PlainLine>
        Detected <Em>react-router</Em> from <Em>package.json</Em> —
        pre-selecting in prompt.
      </PlainLine>
      <OkLine>
        Which framework are you using? <Arrow />{' '}
        <Choice>React Router (RR7 / Remix)</Choice>
      </OkLine>
      <OkLine>
        Default reablocks theme? <Arrow /> <Choice>Dark (default)</Choice>
      </OkLine>
      <OkLine>
        Running this command will install dependencies and may modify your
        stylesheet + app entry. Proceed? … <Choice>yes</Choice>
      </OkLine>
      <OkLine>
        Installing <Em>reablocks</Em>...
      </OkLine>
      <OkLine>
        Installing <Em>tailwindcss</Em>...
      </OkLine>
      <OkLine>
        Found stylesheet: <FileEm>app/app.css</FileEm>
      </OkLine>
      <OkLine>
        Apply this change to <FileEm>app/app.css</FileEm>? …{' '}
        <Choice>yes</Choice>
      </OkLine>
      <OkLine>
        Wiring Tailwind v4 into <FileEm>app/app.css</FileEm>...
      </OkLine>
      <OkLine>
        Found host: <FileEm>app/root.tsx</FileEm>
      </OkLine>
      <OkLine>
        Apply this change to <FileEm>app/root.tsx</FileEm>? …{' '}
        <Choice>yes</Choice>
      </OkLine>
      <OkLine>
        Adding <Em>theme-dark</Em> class to <FileEm>app/root.tsx</FileEm>
      </OkLine>
      <OkLine>
        Apply this change to <FileEm>app/root.tsx</FileEm>? …{' '}
        <Choice>yes</Choice>
      </OkLine>
      <OkLine>
        Wiring <FileEm>&lt;ThemeProvider /&gt;</FileEm> in{' '}
        <FileEm>app/root.tsx</FileEm>...
      </OkLine>

      <div className="flex items-start gap-2.5">
        <span className="w-[18px] shrink-0 inline-flex items-start text-cyan-300 mt-0.5">
          $
        </span>
        <span className="inline-block w-[7px] h-3.5 bg-cyan-300 motion-safe:animate-rb-caret align-middle" />
      </div>
    </div>
  </div>
);

const PromptLine: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-2.5">
    <span className="w-[18px] shrink-0 inline-flex items-start text-cyan-300 mt-0.5">
      $
    </span>
    {children}
  </div>
);

const OkLine: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-2.5">
    <span className="w-[18px] shrink-0 inline-flex items-start text-rb-good mt-0.5">
      ✔
    </span>
    <span>{children}</span>
  </div>
);

const PlainLine: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-2.5 text-rb-fg-3">
    <span className="w-[18px] shrink-0" />
    <span>{children}</span>
  </div>
);

const Spacer: FC = () => <div className="h-1" aria-hidden="true" />;

const Em: FC<{ children: ReactNode }> = ({ children }) => (
  <em className="not-italic text-rb-fg-2">{children}</em>
);

const FileEm: FC<{ children: ReactNode }> = ({ children }) => (
  <em className="not-italic text-blue-300 font-medium">{children}</em>
);

const Arrow: FC = () => <span className="text-rb-fg-muted">›</span>;

const Choice: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="text-white">{children}</span>
);
