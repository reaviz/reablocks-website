import { Canvas } from '@storybook/blocks';
import { FC } from "react";
import { useTheme } from 'nextra-theme-docs';

export type ToggleCanvasProps = {
  of?: any;
};

export const ToggleCanvas: FC<ToggleCanvasProps> = props => {
  const { setTheme, ...rest } = useTheme();

  return (
    <Canvas
      {...props}
      additionalActions={[
        {
          title: 'Toggle Theme',
          onClick: () => {
            setTheme(rest.theme === 'dark' ? 'light' : 'dark');
            rest.theme = rest.theme === 'dark' ? 'light' : 'dark';
          }
        }
      ]}
    />
  );
};
