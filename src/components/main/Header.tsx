'use client';

import { cn } from '@/utils/cn';
import { FC, useEffect, useState } from 'react';
import { Nav } from '../layout/nav';

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledCheck = window.scrollY > 80;
      setIsScrolled(isScrolledCheck);
    };

    document.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        `border-opacity-15 fixed top-0 z-50 flex w-full justify-center border-b border-gray-400/30 bg-[#11111F] transition-[backdrop-filter] md:bg-transparent`,
        isScrolled && 'md:backdrop-blur-md'
      )}
    >
      <Nav />
    </header>
  );
};
