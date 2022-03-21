import type { NextPage } from "next";
import { Html, Head, Main, NextScript } from "next/document";

const Document: NextPage = () => (
  <Html lang="en">
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const mode = localStorage.getItem("mode");
            if (mode) {
              const dark =
                mode !== "light" &&
                (mode === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches);
              if (dark) document.querySelector("html").classList.add("dark");
            }`,
        }}
      />
    </Head>
    <body className="bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
