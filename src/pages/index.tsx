import Image from "next/image";
import { Inter } from "next/font/google";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'reablocks',
  description: '50+ Components for ReactJS based on TailwindCSS and Framer Motion',
};

export default function Home() {
  return (
    <main
      className={`bg-gradient-to-b from-[#11111F] from-50% to-[#121212] flex min-h-screen flex-col items-center justify-between ${inter.className} antiasliased`}
    >
      <header className={`sticky top-0 border-b border-transparent backdrop-blur-sm transition duration-200 ease-in-out animate-header-slide-down-fade pt-6`}>
        <Image src="/logo.svg" alt="logo" width={200} height={50} />
      </header>
      <section className={`flex-1`}>
        hello
      </section>
    </main>
  );
}
