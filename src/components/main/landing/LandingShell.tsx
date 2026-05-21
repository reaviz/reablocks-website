'use client';

import { FC } from 'react';
import { theme, ThemeProvider } from 'reablocks';
import { Header } from '@/components/main/Header';
import { ReablocksRelease } from '@/utils/reablocks-version';
import { SectionRule } from './atoms';
import { AiSkills } from './AiSkills';
import { Blocks } from './Blocks';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Onboarding } from './Onboarding';
import { Playground } from './Playground';
import { SectionNav } from './SectionNav';
import { Showcase } from './Showcase';
import { Stats } from './Stats';
import { ThemeStudio } from './ThemeStudio';

interface LandingShellProps {
  release: ReablocksRelease;
}

export const LandingShell: FC<LandingShellProps> = ({ release }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SectionNav />
      <div className="rb-landing">
        <main>
          <Hero release={release} />

          <Stats />

          <SectionRule title="Build" num="01" />
          <Showcase />

          <SectionRule title="Playground" num="02" />
          <Playground />

          <SectionRule title="Theming" num="03" />
          <ThemeStudio />

          <SectionRule title="Install" num="04" />
          <Onboarding />

          <SectionRule title="AI-Native" num="05" />
          <AiSkills />

          <SectionRule title="Blocks" num="06" />
          <Blocks />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
