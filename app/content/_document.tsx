import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
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
        <meta
          name="twitter:title"
          content="Reablocks - Open Source ReactJS Component Library"
        />
        <meta
          name="twitter:description"
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
