import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Unstyled } from '@storybook/blocks';
import { ThemeProvider, theme } from 'reablocks';

import { ExternalDocs } from '@storybook/blocks';
import * as reactAnnotations from '@storybook/react/dist/entry-preview.mjs';
import * as previewAnnotations from '../../.storybook/preview';
import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    try {
      posthog.init('phc_KpMeH726m3pXXzMzj5AuiY1SDPstX8pTVxmxPEJkiCK', { api_host: "https://us.i.posthog.com" })
    } catch {
      /** noop */
    }
  }, []);
  
  if (Component.name === 'Home') {
    return (
      <Unstyled>
        <Component {...pageProps} />
      </Unstyled>
    );
  }

  return (
    <ExternalDocs projectAnnotationsList={[reactAnnotations, previewAnnotations]}>
      <Unstyled>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Unstyled>
    </ExternalDocs>
  );
}
