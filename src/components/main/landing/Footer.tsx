'use client';

import { FC } from 'react';
import LogoIcon from '../../../../public/logo.svg';
import { CopyButton, Icon } from './atoms';

type FooterItem = string | { label: string; sub?: string; href?: string };

const COLS: Array<{ title: string; items: FooterItem[] }> = [
  {
    title: 'Library',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Blocks', href: '/blocks' },
      { label: 'Theming', href: '/docs/theme/getting-started' },
      { label: 'Support', href: '/support' }
    ]
  },
  {
    title: 'Ecosystem',
    items: [
      { label: 'Reaviz', sub: 'Charts', href: 'https://reaviz.dev' },
      { label: 'Reagraph', sub: 'Graphs', href: 'https://reagraph.dev' },
      { label: 'Reachat', sub: 'Chat / LLM', href: 'https://reachat.dev' },
      {
        label: 'Reakeys',
        sub: 'Hotkeys',
        href: 'https://github.com/reaviz/reakeys'
      }
    ]
  },
  {
    title: 'Built by',
    items: [
      { label: 'Reaviz', href: 'https://github.com/reaviz' },
      {
        label: 'Apache 2.0',
        href: 'https://github.com/reaviz/reablocks/blob/master/LICENSE'
      },
      { label: 'ChangeLog', href: '/docs/changelog' }
    ]
  }
];

export const Footer: FC = () => (
  <footer className="border-t border-rb-hairline pt-16 pb-7 mt-20 bg-gradient-to-b from-transparent to-black/30 max-[640px]:pt-10 max-[640px]:mt-12">
    <div className="w-full max-w-[1240px] mx-auto px-7 max-[640px]:px-5">
      <div className="grid grid-cols-[1.2fr_2fr] gap-12 mb-10 max-[820px]:grid-cols-1">
        <div>
          <a
            href="/"
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
        <div className="grid grid-cols-3 gap-8 max-[540px]:grid-cols-2 max-[540px]:gap-6">
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-rb-fg-3 mb-3">
                {c.title}
              </div>
              <ul className="list-none p-0 m-0 grid gap-2">
                {c.items.map((i) => {
                  const isObj = typeof i !== 'string';
                  const label = isObj ? i.label : i;
                  const sub = isObj ? i.sub : undefined;
                  const href = isObj ? i.href : undefined;
                  const isExternal = !!href && /^https?:\/\//.test(href);
                  return (
                    <li key={label}>
                      <a
                        href={href ?? '#'}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noreferrer' : undefined}
                        onClick={
                          href ? undefined : (e) => e.preventDefault()
                        }
                        className="group text-rb-fg-2 text-[13.5px] no-underline hover:text-white transition-colors duration-150 inline-flex items-baseline gap-1.5"
                      >
                        <span>{label}</span>
                        {sub && (
                          <span className="text-rb-fg-3 text-[12px] group-hover:text-rb-fg-2 transition-colors duration-150">
                            {sub}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="h-px bg-rb-hairline border-0 m-0" />
      <div className="mt-6 flex items-center justify-between text-rb-fg-3 text-[12.5px] font-mono max-[540px]:flex-col max-[540px]:gap-3 max-[540px]:items-start">
        <span>© {new Date().getFullYear()} Reaviz · Apache 2.0</span>
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
        </span>
      </div>
    </div>
  </footer>
);
