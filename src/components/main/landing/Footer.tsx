'use client';

import { FC } from 'react';
import LogoIcon from '../../../../public/logo.svg';
import { CopyButton, Icon } from './atoms';

const COLS: Array<{ title: string; items: string[] }> = [
  {
    title: 'Library',
    items: ['Docs', 'Components', 'Blocks', 'Theming', 'Changelog']
  },
  {
    title: 'Resources',
    items: ['Storybook', 'Templates', 'Migrations', 'Roadmap']
  },
  {
    title: 'Community',
    items: ['GitHub', 'Discord', 'X / Twitter', 'Bluesky']
  },
  { title: 'Built by', items: ['Reaviz', 'Apache 2.0', 'Status', 'Press kit'] }
];

export const Footer: FC = () => (
  <footer className="border-t border-rb-hairline pt-16 pb-7 mt-20 bg-gradient-to-b from-transparent to-black/30">
    <div className="w-full max-w-[1240px] mx-auto px-7">
      <div className="grid grid-cols-[1.2fr_2fr] gap-12 mb-10 max-[820px]:grid-cols-1">
        <div>
          <a
            href="#"
            aria-label="Reablocks home"
            className="inline-flex items-center text-white"
          >
            <LogoIcon className="h-fit w-[168px] text-white" />
          </a>
          <p className="text-rb-fg-3 text-sm max-w-[38ch] mt-3 mb-[18px]">
            A premium React component library and block system for ambitious
            enterprise apps.
          </p>
          <div className="flex items-center gap-2">
            <code className="font-mono bg-white/[0.04] border border-rb-hairline-2 px-2.5 py-1.5 rounded-md text-[13px] text-cyan-300">
              npm i reablocks
            </code>
            <CopyButton getText={() => 'npm i reablocks'} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 max-[540px]:grid-cols-2 max-[540px]:gap-6">
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-rb-fg-3 mb-3">
                {c.title}
              </div>
              <ul className="list-none p-0 m-0 grid gap-2">
                {c.items.map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-rb-fg-2 text-[13.5px] no-underline hover:text-white transition-colors duration-150"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="h-px bg-rb-hairline border-0 m-0" />
      <div className="mt-6 flex items-center justify-between text-rb-fg-3 text-[12.5px] font-mono max-[540px]:flex-col max-[540px]:gap-3 max-[540px]:items-start">
        <span>© 2026 Reaviz · Apache 2.0</span>
        <span className="flex gap-4 items-center">
          <a
            href="https://github.com/reaviz/reablocks"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors duration-150"
          >
            <Icon.github />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:text-white transition-colors duration-150"
          >
            Privacy
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:text-white transition-colors duration-150"
          >
            Terms
          </a>
        </span>
      </div>
    </div>
  </footer>
);
