import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";
import { NextWebVitalsMetric } from "next/app";
import { useRouter } from "next/router";

import BreakpointContext from "~/old/client/context/breakpoint";
import SetToastContext from "~/old/client/context/toast";
import { useBreakpointInit } from "~/old/client/hooks/breakpoint";
import { useToastInit } from "~/old/client/hooks/toast";

import A from "~/old/client/components/anchor";
import BlogImage from "~/old/client/components/blogImage";
import PostHeading from "~/old/client/components/postHeading";
import Toast from "~/old/client/components/toast";
import { ErrorBoundary } from "~/old/client/layouts/errors";

import { AppPropsWithLayout } from "~/old/types/client/utils.type";

import "~/client/styles/globals.css";

export default function NextApp({ Component, pageProps }: AppPropsWithLayout) {
  const breakpoint = useBreakpointInit();
  const { toast, setToast } = useToastInit();
  const router = useRouter();
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <ErrorBoundary>
      <BreakpointContext.Provider value={breakpoint}>
        <SetToastContext.Provider value={setToast}>
          <MDXProvider
            components={{
              a: ({ ref, ...rest }) => <A {...rest} />,
              h1: props => <PostHeading {...props} level={1} />,
              h2: props => <PostHeading {...props} level={2} />,
              h3: props => <PostHeading {...props} level={3} />,
              h4: props => <PostHeading {...props} level={4} />,
              h5: props => <PostHeading {...props} level={5} />,
              h6: props => <PostHeading {...props} level={6} />,
              img: ({ src, alt }) => <BlogImage src={src ?? ""} caption={alt ?? "no caption"} />,
            }}
          >
            <div
              id="wrapper"
              className={clsx(
                "relative min-h-[100vh]",
                !router.asPath.startsWith("/docs") &&
                  !router.asPath.startsWith("/auth") &&
                  "pb-[250px] sm:pb-[165px]"
              )}
            >
              {getLayout(<Component {...pageProps} />, pageProps, router)}
            </div>
            <Toast toast={toast} onClose={() => setToast(null)} />
          </MDXProvider>
        </SetToastContext.Provider>
      </BreakpointContext.Provider>
    </ErrorBoundary>
  );
}

/**
 * @see {@link https://www.axiom.co/docs/integrations/vercel}
 */
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (window && window.localStorage.getItem("privacy-consent") === "declined") return;

  const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT;
  if (!url) return;

  const body = JSON.stringify({ route: window.__NEXT_DATA__.page, ...metric });

  if (navigator.sendBeacon) navigator.sendBeacon(url, body);
  else fetch(url, { body, method: "POST", keepalive: true });
}
