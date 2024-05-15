import { Html, Head, Main, NextScript } from "next/document";
import posthog from 'posthog-js';
import { useEffect } from 'react';

export default function Document() {
  useEffect(() => {
    try {
      posthog.init('phc_KpMeH726m3pXXzMzj5AuiY1SDPstX8pTVxmxPEJkiCK', { api_host: "https://us.i.posthog.com" })
    } catch {
      /** noop */
    }
  });

  return (
    <Html lang="en">
      <Head>
        <meta property="og:image" content="https://reablocks.dev/preview.png" />
        <meta
          property="og:title"
          content="Reablocks - Open Source ReactJS Component Library"
        />
        <meta
          property="og:description"
          content="Beautifully designed, highly customizable, Open Source React components based on Tailwind and Framer Motion."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
