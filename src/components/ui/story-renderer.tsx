'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { DotsLoader, theme, ThemeProvider } from 'reablocks';

interface StoryRendererProps {
  path: string;
  name: string;
  showSource?: boolean;
  storybookKey?: string;
}

const getComponentName = (storyModule: any): string => {
  try {
    const defaultExport = storyModule.default;
    if (defaultExport?.component?.displayName) {
      return defaultExport.component.displayName;
    }
    if (defaultExport?.component?.name) {
      return defaultExport.component.name;
    }
    if (defaultExport?.title) {
      const titleParts = defaultExport.title.split('/');
      return titleParts[titleParts.length - 1];
    }
    return 'Component';
  } catch (error) {
    return 'Component';
  }
};

const getStorySource = (storyModule: any, storyName: string): string => {
  try {
    const story = storyModule[storyName];
    if (!story) return '';

    const componentName = getComponentName(storyModule);
    const storySource = [];

    if (story.render) {
      storySource.push(
        `export const ${storyName} = ${story.render.toString()};`
      );
    } else if (story.args) {
      storySource.push(
        `export const ${storyName} = args => <${componentName} {...args} />;`
      );
      storySource.push(
        `${storyName}.args = ${JSON.stringify(story.args, null, 2)};`
      );
    }

    return storySource.join('\n');
  } catch (error) {
    console.error('Error extracting story source:', error);
    return '';
  }
};

const StoryContent: React.FC<{
  storyModule: any;
  storyName: string;
  showSource: boolean;
  storybookKey?: string;
}> = ({ storyModule, storyName, showSource, storybookKey }) => {
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const story = storyModule[storyName];
  const defaultExport = storyModule.default;

  if (!story) {
    return <div>Story not found: {storyName}</div>;
  }

  let renderedComponent;
  try {
    if (story.render) {
      renderedComponent = story.render(story.args || {}, {
        loaded: {},
        parameters: {}
      });
    } else if (story.args && defaultExport?.component) {
      const Component = defaultExport.component;
      renderedComponent = <Component {...story.args} />;
    } else if (typeof story === 'function') {
      const args = story.args || {};
      renderedComponent = story(args);
    } else {
      renderedComponent = <div>Invalid story format: {storyName}</div>;
    }
  } catch (error) {
    console.error(`Error rendering story ${storyName}:`, error);
    renderedComponent = <div>Error rendering story: {storyName}</div>;
  }

  const sourceCode = showSource ? getStorySource(storyModule, storyName) : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="story-container story-preview light:border-gray-200 mt-5 mb-4 rounded-sm border border-gray-800">
      <div className="align-center align-items-center align-content-center flex w-full flex-col flex-wrap items-center justify-center justify-items-center px-6 py-8">
        <div>{renderedComponent}</div>
      </div>
      <div className="flex w-full justify-end">
        <div className="-mt-6 flex items-center gap-0">
          <button
            onClick={() => setIsSourceExpanded(!isSourceExpanded)}
            className="whitespace-no-wrap border-primary inline-flex cursor-pointer items-center justify-center rounded-xs border-0 !bg-black px-2 py-1 font-sans text-xs font-semibold !text-white select-none disabled:cursor-not-allowed disabled:text-gray-400 data-[variant=filled]:disabled:bg-gray-600"
          >
            {isSourceExpanded ? 'Hide code' : 'Show code'}
          </button>
          <button className="whitespace-no-wrap border-primary inline-flex cursor-pointer items-center justify-center rounded-xs border-0 !bg-black px-2 py-1 font-sans text-xs font-semibold !text-white select-none disabled:cursor-not-allowed disabled:text-gray-400 data-[variant=filled]:disabled:bg-gray-600">
            Toggle Theme
          </button>
          {storybookKey && (
            <Link
              className="whitespace-no-wrap border-primary inline-flex cursor-pointer items-center justify-center rounded-xs border-0 !bg-black px-2 py-1 font-sans text-xs font-semibold !text-white select-none disabled:cursor-not-allowed disabled:text-gray-400 data-[variant=filled]:disabled:bg-gray-600"
              href={`https://storybook.reablocks.dev/?path=/story/${storybookKey}`}
              target="_blank"
            >
              View Storybook
            </Link>
          )}
        </div>
      </div>
      {isSourceExpanded && (
        <div className="story-source animate-in slide-in-from-top-2 bg-black duration-200">
          <pre className="overflow-x-auto p-4 text-sm text-gray-100">
            <code className="text-gray-100">
              <span className="text-purple-400">args</span>{' '}
              <span className="text-gray-300">=&gt;</span>{' '}
              <span className="text-yellow-300">&lt;</span>
              <span className="text-blue-400">
                {getComponentName(storyModule)}
              </span>{' '}
              <span className="text-yellow-300">&#123;...args&#125;</span>{' '}
              <span className="text-yellow-300">/&gt;</span>
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};

const createDynamicStoryComponent = (
  path: string,
  name: string,
  showSource = true,
  storybookKey?: string
) => {
  return dynamic(
    () => {
      return import(`../../stories/${path}`)
        .then(mod => ({
          default: () => (
            <StoryContent
              storyModule={mod}
              storyName={name}
              showSource={showSource}
              storybookKey={storybookKey}
            />
          )
        }))
        .catch(error => {
          console.error(`Failed to load story module: ${path}`, error);
          return {
            default: () => <div>Failed to load story: {path}</div>
          };
        });
    },
    {
      loading: () => (
        <div className="flex min-h-[100px] items-center justify-center">
          <DotsLoader size="medium" />
        </div>
      ),
      ssr: false
    }
  );
};

export const StoryRenderer: React.FC<StoryRendererProps> = ({
  path,
  name,
  storybookKey,
  showSource = true
}) => {
  const DynamicStoryComponent = createDynamicStoryComponent(
    path,
    name,
    showSource,
    storybookKey
  );

  return (
    <ThemeProvider theme={theme}>
      <DynamicStoryComponent />
    </ThemeProvider>
  );
};
