import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import LogoIcon from '../../../public/logo.svg';

import { cn } from '@/utils/cn';

const navLinks = [
  {
    label: 'Docs',
    href: '/docs'
  },
  {
    label: 'Blocks',
    href: '/blocks'
  },
  {
    label: 'Storybook',
    href: 'https://storybook.reablocks.dev'
  },
  {
    label: 'GitHub',
    href: 'https://github.com/reaviz/reablocks',
    target: '_blank'
  }
];

export const Nav: FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <nav
      className={cn(
        'relative flex h-fit w-full max-w-[1440px] items-center p-6 transition-[box-shadow] md:justify-center',
        isNavOpen && 'shadow-xl'
      )}
      aria-label="Global"
    >
      <div className="absolute top-3 left-4 flex-1 md:top-7 md:left-20">
        <a href="/">
          <span className="sr-only">reablocks</span>
          <LogoIcon className="h-fit w-[150px] text-white" />
        </a>
      </div>
      <div className="absolute top-3 right-4 flex md:hidden">
        <button
          type="button"
          className="text-content-secondary -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isNavOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4 16L16 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 4L16 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="hidden md:flex md:gap-x-4 lg:gap-x-12">
        {navLinks.map(({ label, href, target }, index) => (
          <motion.span
            key={`nav-link-${label}-${index}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 * index } }}
          >
            <Link
              href={href}
              className="text-mist-gray hover:text-white text-base leading-6 font-semibold transition-colors"
              target={target}
            >
              {label}
            </Link>
          </motion.span>
        ))}
      </div>
      {isNavOpen && (
        <div className="flex w-full flex-col gap-2 pt-6">
          {navLinks.map(({ label, href, target }, index) => (
            <motion.div
              key={`nav-link-mobile-${label}-${index}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * index } }}
            >
              <Link
                className="text-content-secondary hover:text-content-primary transition-colors lg:inline-block"
                href={href}
                target={target}
                onClick={() => setIsNavOpen(false)}
              >
                <span>{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </nav>
  );
};
