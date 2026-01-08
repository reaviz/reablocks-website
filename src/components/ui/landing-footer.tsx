'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface LandingFooterProps {
  logo: ReactNode;
  className?: string;
  libName: string;
}

export const LandingFooter: FC<LandingFooterProps> = ({
  logo,
  className = '',
  libName
}) => {
  return (
    <footer className={`w-full ${className}`}>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          {logo}
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href={`https://github.com/reaviz/${libName}`} className="hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="https://discord.gg/tt8wGExq35" className="hover:text-white transition-colors">
            Discord
          </Link>
          <Link href={`https://npm.im/${libName}`} className="hover:text-white transition-colors">
            NPM
          </Link>
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Reablocks. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
