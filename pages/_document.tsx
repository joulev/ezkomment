import { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";

const Document: NextPage = () => (
  <Html lang="en">
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const mode = localStorage.getItem("mode");
            const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (mode) {
              if (mode !== "light" && (mode === "dark" || darkTheme))
                document.querySelector("html").classList.add("dark");
            } else if (darkTheme) {
              document.querySelector("html").classList.add("dark");
            }`,
        }}
      />
    </Head>
    <body className="bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200 overflow-y-scroll">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
