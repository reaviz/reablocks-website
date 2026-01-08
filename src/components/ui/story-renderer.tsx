'use client';

import React, { FC, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DotsLoader, theme, ThemeProvider } from 'reablocks';

interface StoryRendererProps {
  path: string;
  name: string;
  storybookKey?: string;
}

interface StoryModule {
  default?: any;
  [key: string]: any;
}

const StoryContent: FC<{
  storyModule: StoryModule;
  storyName: string;
  storyPath: string;
  storybookUrl: string;
  storybookKey?: string;
}> = ({ storyModule, storyName, storyPath, storybookUrl, storybookKey }) => {
  const [showCode, setShowCode] = useState(false);
  const [source, setSource] = useState<string | null>(null);

  // Get the story component
  const Story = storyModule[storyName];

  // Fetch the source code - hook must be called before any early returns
  useEffect(() => {
    if (!Story) return;

    const fetchSource = async () => {
      try {
        const response = await fetch(
          `/api/story-source?storyPath=${encodeURIComponent(storyPath)}&functionName=${encodeURIComponent(storyName)}`
        );
        if (response.ok) {
          const data = await response.json();
          setSource(data.source);
        }
      } catch (error) {
        console.error('Failed to fetch source:', error);
      }
    };
    fetchSource();
  }, [storyPath, storyName, Story]);

  if (!Story) {
    return <div className="text-red-500">Story &quot;{storyName}&quot; not found in {storyPath}</div>;
  }

  // Build storybook URL
  const getStorybookUrl = () => {
    if (!storybookKey) return null;
    return `${storybookUrl}/?path=/story/${storybookKey}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mt-4 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700 bg-gray-900/50">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300"
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
            {getStorybookUrl() && (
              <a
                href={getStorybookUrl()!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white"
              >
                Open in Storybook
              </a>
            )}
          </div>
        </div>
        <div className="p-6 flex items-center justify-center min-h-[100px]">
          <Story />
        </div>
        {showCode && source && (
          <div className="border-t border-gray-700 bg-gray-900">
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{source}</code>
            </pre>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export const StoryRenderer: FC<StoryRendererProps> = ({
  path,
  name,
  storybookKey
}) => {
  const DynamicComponent = dynamic(
    () =>
      import(`../../stories/${path}`)
        .then((storyModule: StoryModule) => ({
          default: () => (
            <StoryContent
              storyModule={storyModule}
              storyName={name}
              storyPath={path}
              storybookUrl="https://storybook.reablocks.dev"
              storybookKey={storybookKey}
            />
          )
        }))
        .catch((err) => {
          console.error('Failed to load story:', err);
          return {
            default: () => <div className="text-red-500">Failed to load story: {path}</div>
          };
        }),
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
