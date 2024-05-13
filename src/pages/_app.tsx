import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ExternalDocs } from "@storybook/blocks";
import { ThemeProvider, theme } from "reablocks";
import * as reactAnnotations from "@storybook/react/dist/entry-preview.mjs";
import * as previewAnnotations from "../../.storybook/preview";

export default function App({ Component, pageProps }: AppProps) {
  if (Component.name === 'Home') {
    return <Component {...pageProps} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ExternalDocs
        projectAnnotationsList={[reactAnnotations, previewAnnotations]}
      >
        <Component {...pageProps} />
      </ExternalDocs>
    </ThemeProvider>
  );
}
