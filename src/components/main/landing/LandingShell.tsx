'use client';

import { FC } from 'react';
import { theme, ThemeProvider } from 'reablocks';
import { Header } from '@/components/main/Header';
import { ReablocksRelease } from '@/utils/reablocks-version';
import { SectionRule } from './atoms';
import { AiSkills } from './AiSkills';
import { Blocks } from './Blocks';
import { BuiltBy } from './BuiltBy';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Onboarding } from './Onboarding';
import { Playground } from './Playground';
import { SectionNav } from './SectionNav';
import { Showcase } from './Showcase';
import { Stats } from './Stats';
import { ThemeStudio } from './ThemeStudio';
import { Unify } from './Unify';

interface LandingShellProps {
  release: ReablocksRelease;
}

export const LandingShell: FC<LandingShellProps> = ({ release }) => {
  return (
    <ThemeProvider theme={theme}>
      <a href="#main-content" className="rb-skip-link">
        Skip to main content
      </a>
      <Header />
      <SectionNav />
      <div className="rb-landing">
        <main id="main-content" aria-label="Reablocks landing page">
          <Hero release={release} />

          <Stats />

          <SectionRule title="Built with Reablocks" num="01" />
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

          <SectionRule title="Unify Design System" num="07" />
          <Unify />

          <SectionRule title="Built by Good Code" num="08" />
          <BuiltBy />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
