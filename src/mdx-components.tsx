import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Runner } from '@/components/ui/runner';
import { StoryRenderer } from '@/components/ui/story-renderer';
import { PropsTable } from '@/components/ui/props-table';
import { ThemeRender } from '@/components/ui/theme-render';

export function useMDXComponents(components: Record<string, unknown>): Record<string, unknown> {
  return {
    ...defaultMdxComponents,
    Runner,
    StoryRenderer,
    PropsTable,
    ThemeRender,
    ...components,
  };
}
