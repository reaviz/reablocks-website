import { Metadata } from "next";
import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { LandingFooter } from 'reablocks-docs-theme';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Divider } from '@/components/ui/divider';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { TracingBeams } from '@/components/ui/tracing-beams';
import SparklesIcon from '@/icons/Sparkles';
import { Hero } from '@/components/main/Hero';
import { Header } from '@/components/main/Header';
import LogoIcon from '../../public/logo.svg';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Reablocks - Open Source ReactJS Component Library",
  description:
    "50+ Components for ReactJS based on Tailwind CSS and Framer Motion",
};

export default function Home() {
  return (
    <main
      className={`flex min-h-screen w-full flex-col items-center overflow-y-hidden bg-gradient-to-b from-[#11111F] from-50% via-[#11111F] to-[#121212] ${inter.className} antiasliased overflow-x-hidden text-white`}
      style={
        {
          '--tw-gradient-from': '#11111F',
          '--tw-gradient-via': '#11111F',
          '--tw-gradient-to': '#121212'
        } as React.CSSProperties
      }
    >
      <div className="absolute top-0 h-screen w-full bg-gradient-to-b from-[#00000020] to-transparent" />
      <Header />
      <TracingBeams className="hidden md:block">
        <HeroParallax
          products={[
            {
              title: 'Buttons',
              link: '/docs/components/elements/button',
              thumbnail: '/buttons.png'
            },
            {
              title: 'Avatars',
              link: '/docs/components/elements/avatar',
              thumbnail: '/avatars.png'
            },
            {
              title: 'Notification',
              link: '/docs/components/layers/notification',
              thumbnail: '/notification.png'
            },
            {
              title: 'Fields',
              link: '/docs/components/form/input',
              thumbnail: '/fields.png'
            },
            {
              title: 'Tabs',
              link: '/docs/components/layout/tabs',
              thumbnail: '/tabs.png'
            },
            {
              title: 'Checkboxes',
              link: '/docs/components/form/checkbox',
              thumbnail: '/checkboxes.png'
            },
            {
              title: 'Buttons',
              link: '/docs/components/elements/button',
              thumbnail: '/buttons.png'
            },
            {
              title: 'Avatars',
              link: '/docs/components/elements/avatar',
              thumbnail: '/avatars.png'
            },
            {
              title: 'Notification',
              link: '/docs/components/layers/notification',
              thumbnail: '/notification.png'
            },
            {
              title: 'Fields',
              link: '/docs/components/form/input',
              thumbnail: '/fields.png'
            },
            {
              title: 'Tags',
              link: '/docs/components/elements/chip',
              thumbnail: '/tags.png'
            },
            {
              title: 'Toggle',
              link: '/docs/components/form/toggle',
              thumbnail: '/toggle.png'
            },
            {
              title: 'Range',
              link: '/docs/components/elements/range',
              thumbnail: '/range.png'
            },
            {
              title: 'Radio buttons',
              link: '/docs/components/form/radio',
              thumbnail: '/radio-buttons.png'
            },
            {
              title: 'Menu',
              link: '/docs/components/layers/menu',
              thumbnail: '/menu.png'
            },
            {
              title: 'Badges',
              link: '/docs/components/elements/chip',
              thumbnail: '/badges.png'
            },
            {
              title: 'Tags',
              link: '/docs/components/elements/chip',
              thumbnail: '/tags.png'
            },
            {
              title: 'Toggle',
              link: '/docs/components/form/toggle',
              thumbnail: '/toggle.png'
            },
            {
              title: 'Range',
              link: '/docs/components/elements/range',
              thumbnail: '/range.png'
            },
            {
              title: 'Radio buttons',
              link: '/docs/components/form/radio',
              thumbnail: '/radio-buttons.png'
            }
          ]}
        >
          <Hero />
        </HeroParallax>
        <section className="container mt-20 px-4 md:px-24">
          <div className="flex w-full items-center gap-2">
            <div className="to-secondary h-px flex-1 bg-gradient-to-r from-transparent" />
            <SparklesIcon className="h-3 w-3" />
            <SparklesIcon className="h-4 w-4" />
            <SparklesIcon className="h-3 w-3" />
            <div className="from-secondary h-px flex-1 bg-gradient-to-r to-transparent" />
          </div>
        </section>
        <section className="container mt-20 px-4 md:px-24">
          <div className="mb-4 flex flex-col items-start gap-4 md:mb-20 md:max-w-[50%]">
            <a href="https://github.com/reaviz/reablocks" target="_blank">
              <img
                alt="GitHub stars"
                src="https://img.shields.io/github/stars/reaviz/reablocks?style=social"
              />
            </a>
            <h3 className="text-content text-4xl !leading-[150%] font-bold md:text-6xl md:!leading-[120%]">
              Enterprise ready{' '}
              <span className="text-blue-300">Open-Source</span> components
            </h3>
            <p className="text-content-secondary mt-4 text-base md:text-lg">
              Our collection of enterprise-grade, open-source components provide
              the building blocks you need to create beautifully designed,
              scalable, high-performance applications.
            </p>
          </div>
          <span className="px-3 lg:pl-0 text-2xl font-bold">Getting Started 🚀</span>
          <div className="mt-4 mb-4 md:mb-20">
            <Divider className="absolute left-0 hidden md:block" />
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex flex-1 flex-col gap-2 p-3 lg:pl-0">
                <span className="font-bold">Installing Reablocks</span>
                <p className="text-content-secondary text-xs md:text-base">
                  Install Reablocks & Tailwind into your React project to get
                  started.
                </p>
                <p className="text-content-secondary text-xs md:text-base">
                  Setup your Tailwind config file with our default color tokens
                  using the link below.
                </p>
                <Link
                  aria-label="Learn more about Reablocks"
                  href="/docs/getting-started/setup"
                  className="mt-3 w-fit text-base font-bold text-blue-300 hover:text-blue-400"
                >
                  Learn more
                </Link>
              </div>
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                className="rb-code-block"
                customStyle={{
                  margin: 0,
                  flex: '1 1 0%',
                  backgroundColor: 'transparent',
                  maxWidth: '90vw'
                }}
              >
                {`$ npm install reablocks -S
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init`}
              </SyntaxHighlighter>
            </div>
            <Divider className="absolute left-0 hidden md:block" />
          </div>
          <div className="mb-4 md:mb-20">
            <Divider className="absolute left-0 hidden md:block" />
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex flex-1 flex-col gap-2 p-3 lg:pl-0">
                <span className="font-bold">Creating a custom theme</span>
                <p className="text-content-secondary text-xs md:text-base">
                  {
                    "Extend the default theme to fit your application's unique design language by using "
                  }
                  <span className="text-[#80E2F8]">extendTheme</span>.
                </p>
                <p className="text-content-secondary text-xs md:text-base">
                  Reablocks provides the ability to customize the style of each
                  individual component using Tailwind, giving you the ease and
                  flexibility to match any design.
                </p>
                <Link
                  aria-label="Learn more about Reablocks"
                  href="/docs/getting-started/setup"
                  className="mt-3 w-fit text-base font-bold text-blue-300 hover:text-blue-400"
                >
                  Learn more
                </Link>
              </div>
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                className="rb-code-block"
                customStyle={{
                  margin: 0,
                  flex: '1 1 0%',
                  backgroundColor: 'transparent',
                  maxWidth: '90vw'
                }}
              >
                {`import { theme, extendTheme, PartialReablocksTheme } from 'reablocks';

const partialTheme: PartialReablocksTheme = {
  components: {
    button: {
      base: 'bg-lime-600 text-gray-300',
      variants: {
        filled: 'bg-lime-600 hover:bg-lime-700',
        outline: 'bg-transparent border-lime-600 border',
        text: 'bg-transparent border-0'
      },
      sizes: {
        small: 'p-2',
        medium: 'p-3',
        large: 'p-4'
      }
    }
  }
};
  
export const customTheme = extendTheme(theme, partialTheme)`}
              </SyntaxHighlighter>
            </div>
            <Divider className="absolute left-0 hidden md:block" />
          </div>
          <div className="mt-4 mb-4 md:mb-20">
            <Divider className="absolute left-0 hidden md:block" />
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex flex-1 flex-col gap-2 p-3 lg:pl-0">
                <span className="font-bold">
                  Adding your theme to your application
                </span>
                <p className="text-content-secondary text-xs md:text-base">
                  Wrap your application with{' '}
                  <span className="text-[#80E2F8]">ThemeProvider</span> and pass
                  in your new custom theme. This provider applies styling to all
                  your components, ensuring a consistent look and feel.
                </p>
                <Link
                  aria-label="Learn more about Reablocks"
                  href="/docs/getting-started/setup"
                  className="mt-3 w-fit text-base font-bold text-blue-300 hover:text-blue-400"
                >
                  Learn more
                </Link>
              </div>
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                className="rb-code-block"
                customStyle={{
                  margin: 0,
                  flex: '1 1 0%',
                  backgroundColor: 'transparent',
                  maxWidth: '90vw'
                }}
              >
                {`import { ThemeProvider } from 'reablocks'
import { customTheme } from './theme'
              
export const App = () => {
  <ThemeProvider theme={theme}>
    <YourComponents />
  </ThemeProvider>
};`}
              </SyntaxHighlighter>
            </div>
            <Divider className="absolute left-0 hidden md:block" />
          </div>
        </section>
        <LandingFooter
          logo={<LogoIcon className="h-fit w-[150px] text-white" />}
          className="px-4 py-6 text-base md:px-24"
          libName="reablocks"
        />
      </TracingBeams>
    </main>
  );
}
