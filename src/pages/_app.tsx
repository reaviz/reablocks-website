import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Unstyled } from '@storybook/blocks';

import { ExternalDocs } from '@storybook/blocks';
import * as reactAnnotations from '@storybook/react/dist/entry-preview.mjs';
import * as previewAnnotations from '../../.storybook/preview';

export default function App({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </Unstyled>
    </ExternalDocs>
  );
}
