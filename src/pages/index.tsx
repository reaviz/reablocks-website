import { motion } from "framer-motion";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Divider } from "@/components/ui/divider";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { TracingBeams } from "@/components/ui/tracing-beams";
import { AnimateIn } from "@/components/utils/Count/AnimateIn";
import { Count } from "@/components/utils/Count/Count";
import DribbbleIcon from "@/icons/dribbble.svg";
import GithubIcon from "@/icons/github.svg";
import LinkedinIcon from "@/icons/linkedin.svg";
import SparklesIcon from "@/icons/sparkles.svg";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reablocks - Open Source ReactJS Component Library",
  description:
    "50+ Components for ReactJS based on Tailwind CSS and Framer Motion",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const Hero = ({ className }: { className?: string }) => (
  <div className={className}>
    <section className={`container mt-32 flex-1 px-4 md:px-24`}>
      <div className="relative z-10 flex flex-col items-center gap-4 py-12 md:flex-row">
        <div className="relative flex flex-1 flex-col gap-4">
          <div className="absolute -top-10">
            <a href="https://npm.im/reablocks" target="_blank">
              <img
                alt="Reablocks npm tag"
                src="https://img.shields.io/npm/v/reablocks?style=social"
              />
            </a>
          </div>
          <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[40px] font-bold text-content-primary md:text-6xl">
            Components you never knew you needed.
          </motion.h1>
        </div>
        <motion.div
          className="flex flex-1 flex-col gap-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 }}}
        >
          <p className="text-xs text-content-secondary md:text-base">
            Beautifully designed, highly customizable, Open Source React
            components based on Tailwind and Framer Motion.
          </p>
          <div className="flex gap-4">
            <Link href="https://reablocks.dev/?path=/docs/docs-getting-started-setup--docs">
              <button className="w-1/2 min-w-[125px] rounded-md border border-primary bg-transparent px-4 py-2 font-semibold text-content-primary shadow-button transition-colors hover:border-primary-hover md:w-fit">
                Get Started
              </button>
            </Link>
            <Link href="https://reablocks.dev/?path=/docs/docs-intro--docs">
              <button className="w-1/2 min-w-[125px] rounded-md bg-primary px-4 py-2 font-semibold text-content-primary shadow-button transition-colors hover:bg-primary-hover md:w-fit">
                Demos →
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
    <Divider className="absolute left-0 hidden md:block" />
    <section className="relative z-10 flex w-full justify-center px-0 py-4 md:px-24 md:py-10">
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
        <div className="flex flex-1 flex-col items-center gap-4 border-r border-[#9091A0] border-opacity-[16%] px-12">
          <Count
            className="min-h-9 text-3xl font-bold"
            from={10}
            to={50}
            suffix={"+"}
          />

          <h2 className="text-sm">Components</h2>
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 border-r border-[#9091A0] border-opacity-[16%] px-12">
          <Count
            className="min-h-9 text-3xl font-bold"
            from={0}
            to={8}
            suffix={"+"}
          />
          <h2 className="text-sm">Blocks</h2>
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 border-r border-[#9091A0] border-opacity-[16%] px-12">
          <Count className="min-h-9 text-3xl font-bold" from={0} to={4} />

          <h2 className="text-sm">Utilties</h2>
        </div>

        <div className="flex flex-1 flex-col items-center gap-4 px-12">
          <Count
            className="min-h-9 text-3xl font-bold"
            from={120}
            to={200}
            suffix={"+"}
          />

          <h3 className="text-sm">Stories</h3>
        </div>
      </div>
    </section>
    <Divider className="absolute left-0 hidden md:block" />
  </div>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledCheck = window.scrollY > 80;
      setIsScrolled(isScrolledCheck);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Reablocks - Open Source ReactJS Component Library</title>
        <meta
          name="description"
          content={
            "50+ Components for ReactJS based on Tailwind CSS and Framer Motion"
          }
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <main
        className={`flex min-h-screen w-full flex-col items-center overflow-y-hidden bg-gradient-to-b from-[#11111F] from-50% via-[#11111F] to-[#121212] ${inter.className} antiasliased overflow-x-hidden`}
      >
        <div className="absolute top-0 h-screen w-full bg-gradient-to-b from-[#00000020] to-transparent" />
        <header
          className={cn(
            `fixed top-0 z-50 flex w-full justify-center border-b border-[#9091A0] border-opacity-15 bg-[#11111F] transition-[backdrop-filter] md:bg-transparent`,
            isScrolled && "md:backdrop-blur-md",
          )}
        >
          <nav
            className="relative flex w-full max-w-[1440px] items-center justify-center px-2 py-6 sm:px-2"
            aria-label="Global"
          >
            <div className="absolute left-4 flex-1 md:left-24">
              <a href="#">
                <span className="sr-only">reablocks</span>
                <Image
                  draggable={false}
                  src="/logo.svg"
                  alt="logo"
                  width={122}
                  height={24}
                />
              </a>
            </div>
            <div className="absolute right-4 flex md:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-content-secondary"
              >
                <span className="sr-only">Open main menu</span>
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
              </button>
            </div>
            <div className="hidden md:flex md:gap-x-4 lg:gap-x-12">
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              >
                <Link
                  href="#"
                  className="text-sm font-semibold leading-6 text-content-secondary transition-colors hover:text-content-primary"
                >
                  Home
                </Link>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 }}}
              >
                <Link
                  href="https://reablocks.dev/?path=/docs/docs-intro--docs"
                  className="text-sm font-semibold leading-6 text-content-secondary transition-colors hover:text-content-primary"
                >
                  Docs
                </Link>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              >
                <Link
                  href="https://reablocks.dev/?path=/docs/blocks-foundation-introduction--docs"
                  className="text-sm font-semibold leading-6 text-content-secondary transition-colors hover:text-content-primary"
                >
                  Blocks
                </Link>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              >
                <Link
                  href="mailto:austin@goodcode.us"
                  className="text-sm font-semibold leading-6 text-content-secondary transition-colors hover:text-content-primary"
                >
                  Support
                </Link>
              </motion.span>
            </div>
          </nav>
        </header>
        <TracingBeams className="hidden md:block">
          <HeroParallax
            className="hidden md:block"
            src={"/hero-desktop.png"}
            height={952}
            width={1200}
          >
            <Hero className="z-50" />
          </HeroParallax>
          <Hero className="block md:hidden" />
          <div className="mt-20 flex flex-col items-center gap-4 px-2 md:hidden">
            <AnimateIn>
              <Image
                src="/sign-up-block.png"
                alt="sign up block"
                height={490}
                width={353}
              />
            </AnimateIn>
            <AnimateIn>
              <Image
                src="/change-your-plan-block.png"
                alt="change your plan block"
                height={490}
                width={353}
              />
            </AnimateIn>
            <AnimateIn>
              <Image
                src="/forgot-password-block.png"
                alt="forgot password block"
                height={490}
                width={353}
              />
            </AnimateIn>
            <AnimateIn>
              <Image
                src="/2fa-block.png"
                alt="2f block"
                height={490}
                width={353}
              />
            </AnimateIn>
            <AnimateIn>
              <Image
                src="/reset-password-block.png"
                alt="reset password block"
                height={490}
                width={353}
              />
            </AnimateIn>
            <AnimateIn>
              <Image
                src="/log-in-block.png"
                alt="log in block"
                height={490}
                width={353}
              />
            </AnimateIn>
          </div>
          <section className="container mt-20 px-4 md:px-24">
            <div className="flex w-full items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary" />
              <SparklesIcon className="h-3 w-3" />
              <SparklesIcon className="h-4 w-4" />
              <SparklesIcon className="h-3 w-3" />
              <div className="h-px flex-1 bg-gradient-to-r from-secondary to-transparent" />
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
              <h3 className="text-content text-4xl font-bold !leading-[150%] md:text-6xl md:!leading-[120%]">
                Enterprise ready{" "}
                <span className="text-secondary">Open-Source</span> components
              </h3>
              <p className="mt-4 text-sm text-content-secondary md:text-base">
                Our collection of enterprise-grade, open-source components
                provide the building blocks you need to create beautifully
                designed, scalable, high-performance applications.
              </p>
            </div>
            <span className="text-2xl font-bold">Getting Started 🚀</span>
            <div className="mb-4 mt-4 md:mb-20">
              <Divider className="absolute left-0 hidden md:block" />
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <span className="font-bold">Installing Reablocks</span>
                  <p className="text-xs text-content-secondary md:text-sm">
                    Install Reablocks & Tailwind into your React project to get
                    started.
                  </p>
                  <p className="text-xs text-content-secondary md:text-sm">
                    Setup your Tailwind config file with our default color
                    tokens using the link below.
                  </p>
                  <Link
                    aria-label="Learn more about Reablocks"
                    href="https://reablocks.dev/?path=/docs/docs-getting-started-setup--docs#setup"
                    className="w-fit text-xs text-secondary md:text-sm"
                  >
                    Learn more
                  </Link>
                </div>
                <SyntaxHighlighter
                  language="jsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    flex: "1 1 0%",
                    backgroundColor: "#16161e",
                    maxWidth: "90vw",
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
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <span className="font-bold">Creating a custom theme</span>
                  <p className=" text-xs text-content-secondary md:text-sm">
                    {
                      "Extend the default theme to fit your application's unique design language by using "
                    }
                    <span className="text-[#80E2F8]">extendTheme</span>.
                  </p>
                  <p className=" text-xs text-content-secondary md:text-sm">
                    Reablocks provides the ability to customize the style of
                    each individual component using Tailwind, giving you the
                    ease and flexibility to match any design.
                  </p>
                  <Link
                    aria-label="Learn more about Reablocks"
                    href="https://reablocks.dev/?path=/docs/docs-theme-getting-started--docs"
                    className="w-fit text-xs text-secondary md:text-sm"
                  >
                    Learn more
                  </Link>
                </div>
                <SyntaxHighlighter
                  language="jsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    flex: "1 1 0%",
                    backgroundColor: "#16161e",
                    maxWidth: "90vw",
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
            <div className="mb-4 mt-4 md:mb-20">
              <Divider className="absolute left-0 hidden md:block" />
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <span className="font-bold">
                    Adding your theme to your application
                  </span>
                  <p className="text-xs text-content-secondary md:text-sm">
                    Wrap your application with{" "}
                    <span className="text-[#80E2F8]">ThemeProvider</span> and
                    pass in your new custom theme. This provider applies styling
                    to all your components, ensuring a consistent look and feel.
                  </p>
                  <Link
                    aria-label="Learn more about Reablocks"
                    href="https://reablocks.dev/?path=/docs/docs-theme-getting-started--docs"
                    className="w-fit text-xs text-secondary md:text-sm"
                  >
                    Learn more
                  </Link>
                </div>
                <SyntaxHighlighter
                  language="jsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    flex: "1 1 0%",
                    backgroundColor: "#16161e",
                    maxWidth: "90vw",
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
          <footer className="container px-4 py-6 text-sm text-content-secondary md:px-24">
            <div className="flex items-center justify-between gap-2">
              <Link href="#">
                <Image
                  draggable={false}
                  src="/logo.svg"
                  alt="logo"
                  width={122}
                  height={24}
                />
              </Link>
              <span className="hidden md:block">
                Made with ❤️ by{" "}
                <Link
                  className="text-secondary underline"
                  href="https://goodcode.us"
                >
                  GoodCode
                </Link>
              </span>
              <div className="flex gap-4">
                <Link
                  aria-label="GoodCode's GitHub profile"
                  href="https://github.com/reaviz"
                >
                  <GithubIcon className="h-5 w-5 transition-colors hover:text-content-primary" />
                </Link>
                <Link
                  aria-label="GoodCode's Linkedin profile"
                  href="https://linkedin.com/company/goodcodeus/"
                >
                  <LinkedinIcon className="h-5 w-5 transition-colors hover:text-content-primary" />
                </Link>
                <Link
                  aria-label="GoodCode's Dribbble profile"
                  href="https://dribbble.com/goodcode"
                >
                  <DribbbleIcon className="h-5 w-5 transition-colors hover:text-content-primary" />
                </Link>
              </div>
            </div>
            <div className="block self-center pb-4 pt-10 text-center md:hidden">
              <span>
                Made with ❤️ by{" "}
                <Link
                  className="text-secondary underline"
                  href="https://goodcode.us"
                >
                  GoodCode
                </Link>
              </span>
            </div>
          </footer>
        </TracingBeams>
      </main>
    </>
  );
}
