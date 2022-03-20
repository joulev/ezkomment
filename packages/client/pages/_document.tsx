import type { NextPage } from "next";
import { Html, Head, Main, NextScript } from "next/document";

const Document: NextPage = () => (
  <Html lang="en">
    <Head />
    <body className="bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
