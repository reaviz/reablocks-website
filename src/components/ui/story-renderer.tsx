'use client';

import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { StoryRenderer as BaseStoryRenderer } from 'reablocks-docs-theme';
import { DotsLoader, theme } from 'reablocks';

interface StoryRendererProps {
  path: string;
  name: string;
  storybookKey?: string;
}

export const StoryRenderer: FC<StoryRendererProps> = ({
  path,
  name,
  storybookKey
}) => {
  const DynamicComponent = dynamic(
    () =>
      import(`../../stories/${path}`)
        .then(storyModule => ({
          default: () => (
            <BaseStoryRenderer
              wrapperClassName="block w-fit mx-auto"
              storyModule={storyModule}
              storyName={name}
              storyPath={path}
              storybookUrl="https://storybook.reablocks.dev"
              storybookKey={storybookKey}
            />
          )
        }))
        .catch(() => ({
          default: () => <div>Failed to load story: {path}</div>
        })),
    {
      loading: () => (
        <div className="flex min-h-[100px] items-center justify-center">
          <DotsLoader size="medium" theme={theme.components.dotsLoader} />
        </div>
      ),
      ssr: false
    }
  );

  return <DynamicComponent />;
};
