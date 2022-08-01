import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preload" as="font" href="/fonts/chubbo/Chubbo-Variable.woff2" />
        <link rel="preload" as="font" href="/fonts/supreme/Supreme-Variable.woff2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
