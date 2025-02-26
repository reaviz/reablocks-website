"use client";

import { Canvas } from "@storybook/blocks";
import { useTheme } from "reablocks-docs-theme";
import { FC } from "react";

export type ToggleCanvasProps = {
  of?: any;
  storybook?: string;
};

export const ToggleCanvas: FC<ToggleCanvasProps> = ({
  storybook,
  ...props
}) => {
  const { setTheme, ...rest } = useTheme();

  return (
    <Canvas
      {...props}
      additionalActions={[
        {
          title: "Toggle Theme",
          onClick: () => {
            setTheme(rest.theme === "dark" ? "light" : "dark");
            rest.theme = rest.theme === "dark" ? "light" : "dark";
          },
        },
        ...(storybook
          ? [
              {
                title: "View Storybook",
                onClick: () => {
                  window.open(
                    `https://storybook.reablocks.dev/?path=/story/${storybook}`,
                    "_blank",
                  );
                },
              },
            ]
          : []),
      ]}
    />
  );
};
