import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:image" content="https://reablocks.dev/preview.png" />
        <meta
          name="twitter:image"
          content="https://reablocks.dev/preview.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
