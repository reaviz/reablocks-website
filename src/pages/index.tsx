import Image from "next/image";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "reablocks",
  description:
    "50+ Components for ReactJS based on TailwindCSS and Framer Motion",
};

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#11111F] from-50% to-[#121212] ${inter.className} antiasliased`}
    >
      <header
        className={`animate-header-slide-down-fade sticky top-0 w-full border-b border-transparent pt-6 backdrop-blur-sm transition duration-200 ease-in-out`}
      >
        <nav
          className="relative flex w-full items-center justify-center px-32 py-6 lg:px-8"
          aria-label="Global"
        >
          <div className="absolute right-12 flex-1 lg:left-32">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <Image src="/logo.svg" alt="logo" width={122} height={24} />
            </a>
          </div>
          <div className="absolute left-12 flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#C6CBD9]"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#C6CBD9]"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#C6CBD9]"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#C6CBD9]"
            >
              Blocks
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#C6CBD9]"
            >
              Support
            </a>
          </div>
        </nav>
      </header>
      <section className={`flex-1`}>hello</section>
    </main>
  );
}
