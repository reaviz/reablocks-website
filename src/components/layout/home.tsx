import { motion } from "framer-motion";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Nav } from "@/components/layout/nav";
import { CardsList } from "@/components/ui/cards-list";
import { Divider } from "@/components/ui/divider";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { TracingBeams } from "@/components/ui/tracing-beams";
import { Count } from "@/components/utils/Count/Count";
import { useViewportDimensions } from "@/hooks/useViewportDimensions";
import DribbbleIcon from "@/icons/Dribbble";
import GithubIcon from "@/icons/Github";
import LinkedinIcon from "@/icons/LinkedIn";
import SparklesIcon from "@/icons/Sparkles";
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
  <div className={cn("h-[calc(100vh-300px)]", className)}>
    <section className={`container mt-32 h-full flex-1 px-4 md:px-24`}>
      <div className="relative z-10 flex flex-col gap-4 py-12">
        <div className="relative flex flex-1 flex-col gap-4">
          <div className="absolute -top-10 flex gap-2">
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
            className="text-[40px] font-bold leading-[120%] text-content-primary md:text-[90px]"
          >
            Stop coding from scratch. <br /> Build faster. <br /> Launch sooner.
          </motion.h1>
        </div>
        <motion.div
          className="flex flex-1 flex-col gap-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <p className="text-base text-content-secondary md:text-lg">
            Beautifully designed, highly customizable, Open Source React
            components based on Tailwind and Framer Motion.
          </p>
          <div className="flex gap-4">
            <Link href="/docs">
              <button className="min-w-[125px] whitespace-nowrap rounded-md bg-primary px-4 py-2 font-semibold text-content-primary shadow-button transition-colors hover:bg-primary-hover">
                Get Started →
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
    <Divider className="absolute left-0 z-10 hidden md:block" />
    <section className="relative z-10 flex w-full justify-center px-0 md:px-24 md:py-10">
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
        <div className="flex flex-1 flex-col items-center gap-4 border-r border-[#9091A0] border-opacity-[16%] px-12">
          <Count
            className="min-h-9 text-3xl font-bold"
            from={10}
            to={50}
            suffix={"+"}
          />
          <motion.h2
            className="text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Components
          </motion.h2>
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 border-r border-[#9091A0] border-opacity-[16%] px-12">
          <Count
            className="min-h-9 text-3xl font-bold"
            from={0}
            to={35}
            suffix={"+"}
          />
          <motion.h2
            className="text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Blocks
          </motion.h2>
        </div>

        <div className="flex flex-1 flex-col items-center gap-4 px-12">
          <Count
            className="min-h-9 text-3xl font-bold"
            from={120}
            to={200}
            suffix={"+"}
          />
          <motion.h2
            className="text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Stories
          </motion.h2>
        </div>

        <div className="flex flex-1 flex-col items-center gap-4 border-r border-[#9091A0] border-opacity-[16%] px-12">
          <Count className="min-h-9 text-3xl font-bold" from={0} to={4} />
          <motion.h2
            className="text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Utilities
          </motion.h2>
        </div>
      </div>
    </section>
    <Divider className="absolute left-0 z-10 hidden md:block" />
  </div>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { width } = useViewportDimensions();

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
        className={`flex min-h-screen w-full flex-col items-center overflow-y-hidden bg-gradient-to-b from-[#11111F] from-50% via-[#11111F] to-[#121212] ${inter.className} antiasliased overflow-x-hidden text-white`}
      >
        <div className="absolute top-0 h-screen w-full bg-gradient-to-b from-[#00000020] to-transparent" />
        <header
          className={cn(
            `fixed top-0 z-50 flex w-full justify-center border-b border-[#9091A0] border-opacity-15 bg-[#11111F] transition-[backdrop-filter] md:bg-transparent`,
            isScrolled && "md:backdrop-blur-md",
          )}
        >
          <Nav />
        </header>
        <TracingBeams className="hidden md:block">
          <HeroParallax
            className={width <= 1024 ? "pointer-events-none" : ""}
            products={[
              {
                title: "Buttons",
                link: "/docs/components/elements/button",
                thumbnail: "/buttons.png",
              },
              {
                title: "Avatars",
                link: "/docs/components/elements/avatar",
                thumbnail: "/avatars.png",
              },
              {
                title: "Notification",
                link: "/docs/components/layers/notification",
                thumbnail: "/notification.png",
              },
              {
                title: "Fields",
                link: "/docs/components/form/input",
                thumbnail: "/fields.png",
              },
              {
                title: "Tabs",
                link: "/docs/components/layout/tabs",
                thumbnail: "/tabs.png",
              },
              {
                title: "Checkboxes",
                link: "/docs/components/form/checkbox",
                thumbnail: "/checkboxes.png",
              },
              {
                title: "Buttons",
                link: "/docs/components/elements/button",
                thumbnail: "/buttons.png",
              },
              {
                title: "Avatars",
                link: "/docs/components/elements/avatar",
                thumbnail: "/avatars.png",
              },
              {
                title: "Notification",
                link: "/docs/components/layers/notification",
                thumbnail: "/notification.png",
              },
              {
                title: "Fields",
                link: "/docs/components/form/input",
                thumbnail: "/fields.png",
              },
              {
                title: "Tags",
                link: "/docs/components/elements/chip",
                thumbnail: "/tags.png",
              },
              {
                title: "Toggle",
                link: "/docs/components/form/toggle",
                thumbnail: "/toggle.png",
              },
              {
                title: "Range",
                link: "/docs/components/elements/range",
                thumbnail: "/range.png",
              },
              {
                title: "Radio buttons",
                link: "/docs/components/form/radio",
                thumbnail: "/radio-buttons.png",
              },
              {
                title: "Menu",
                link: "/docs/components/layers/menu",
                thumbnail: "/menu.png",
              },
              {
                title: "Badges",
                link: "/docs/components/elements/chip",
                thumbnail: "/badges.png",
              },
              {
                title: "Tags",
                link: "/docs/components/elements/chip",
                thumbnail: "/tags.png",
              },
              {
                title: "Toggle",
                link: "/docs/components/form/toggle",
                thumbnail: "/toggle.png",
              },
              {
                title: "Range",
                link: "/docs/components/elements/range",
                thumbnail: "/range.png",
              },
              {
                title: "Radio buttons",
                link: "/docs/components/form/radio",
                thumbnail: "/radio-buttons.png",
              },
            ]}
          >
            <Hero />
          </HeroParallax>
          <section className="container mt-20 px-4 md:px-24">
            <div className="flex w-full items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary" />
              <SparklesIcon className="h-3 w-3" />
              <SparklesIcon className="h-4 w-4" />
              <SparklesIcon className="h-3 w-3" />
              <div className="h-px flex-1 bg-gradient-to-r from-secondary to-transparent" />
            </div>
          </section>
          <section className="container my-20 px-4 md:px-24">
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
              <p className="mt-4 text-base text-content-secondary md:text-lg">
                Our collection of enterprise-grade, open-source components
                provide the building blocks you need to create beautifully
                designed, scalable, high-performance applications.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-base md:text-lg">
              <span className="text-2xl font-bold">What is reablocks?</span>
              <p className="mb-4">
                reablocks is a set of beautifully designed, highly customizable,
                open-source React components based on{" "}
                <a
                  className="text-secondary underline"
                  href="https://tailwindcss.com/"
                >
                  Tailwind
                </a>{" "}
                and{" "}
                <a
                  className="text-secondary underline"
                  href="https://www.framer.com/motion/"
                >
                  Framer Motion
                </a>
                . It combines the flexibility and ease of Tailwind CSS with the
                power of Framer Motion to create a seamless and intuitive
                experience for building modern web applications.
              </p>
              <span className="text-2xl font-bold"> Why reablocks?</span>
              <p>
                There are many React component libraries out there, but
                reablocks is unique in a few ways:
                <CardsList
                  items={[
                    {
                      title: "Highly Customizable",
                      description:
                        "reablocks is built on top of Tailwind CSS, which allows for a high level of customization and flexibility.",
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                    {
                      title: "Seamless Animations",
                      description: `reablocks uses Framer Motion for
                      animations and transitions, which makes it easy to add
                      motion to your components.`,
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                    {
                      title: "Easy to Use",
                      description: `reablocks provides a simple and
                      intuitive API that makes it easy to build modern web
                      applications.`,
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                    {
                      title: "Batteries Included",
                      description: `reablocks comes with a set of
                      pre-designed components that you can use out of the box.
                      This includes logins, reset password, manage team and more.`,
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                    {
                      title: "Storybook-first",
                      description: `reablocks is built with Storybook in
                      mind. Every component is documented with examples and usage
                      guidelines in Storybook.`,
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                    {
                      title: "Enterprise focused",
                      description: `reablocks is built with
                      enterprise applications in mind. It includes features
                      components that lend themselves more towards business
                      applications than consumer applications.`,
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                    {
                      title: "Open Source",
                      description: `reablocks is open-source and free to use
                      and we plan to keep it that way. You can use it in your
                      personal or commercial projects.`,
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                    {
                      title: "Real Code, Not Wrappers",
                      description: (
                        <p>
                          reablocks is built with real code, not wrappers around
                          existing libraries. Everything from the select box to
                          the radial charts are all part of the{" "}
                          <a
                            className="text-secondary underline"
                            href="https://github.com/reaviz"
                          >
                            reaviz
                          </a>{" "}
                          portfolio.
                        </p>
                      ),
                      link: "/docs",
                      backgroundImage: "./illustration.svg",
                    },
                  ]}
                />
              </p>
              <span className="text-2xl font-bold"> How do I get started?</span>
              <p>
                To get started with reablocks, check out the{" "}
                <Link
                  className="text-secondary underline"
                  href="/docs/getting-started/setup"
                >
                  Getting Started
                </Link>{" "}
                page. It will walk you through how to install reablocks and get
                up and running with your first component.
              </p>
            </div>
          </section>
          <footer className="container px-4 py-6 text-base text-content-secondary md:px-24">
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
