import type { Preview } from "@storybook/react";
import { ThemeProvider, theme } from "reablocks";

const withProvider = (Story, context) => (
  <ThemeProvider theme={theme}>
    <Story {...context} />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withProvider],
  parameters: {
    layout: "centered"
  }
};

export default preview;
