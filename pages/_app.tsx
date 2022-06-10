import { MDXProvider } from "@mdx-js/react";
import { NextWebVitalsMetric } from "next/app";

import BreakpointContext from "~/context/breakpoint";
import ModeContext from "~/context/mode";
import { useBreakpointInit } from "~/hooks/breakpoint";
import useNProgress from "~/hooks/nprogress";
import { useModeInit } from "~/hooks/theme";

import A from "~/components/anchor";
import PostHeading from "~/components/postHeading";
import { ErrorBoundary } from "~/layouts/errors";

import { AppPropsWithLayout } from "~/types/utils.type";

import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useNProgress();
  const { mode, setMode } = useModeInit();
  const breakpoint = useBreakpointInit();
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <ErrorBoundary>
      <ModeContext.Provider value={{ mode, setMode }}>
        <BreakpointContext.Provider value={breakpoint}>
          <MDXProvider
            components={{
              a: ({ ref, ...rest }) => <A {...rest} />,
              h1: props => <PostHeading {...props} level={1} />,
              h2: props => <PostHeading {...props} level={2} />,
              h3: props => <PostHeading {...props} level={3} />,
              h4: props => <PostHeading {...props} level={4} />,
              h5: props => <PostHeading {...props} level={5} />,
              h6: props => <PostHeading {...props} level={6} />,
            }}
          >
            <div id="wrapper" className="relative min-h-[100vh] pb-[250px] sm:pb-[165px]">
              {getLayout(<Component {...pageProps} />, pageProps)}
            </div>
          </MDXProvider>
        </BreakpointContext.Provider>
      </ModeContext.Provider>
    </ErrorBoundary>
  );
}

/**
 * @see {@link https://www.axiom.co/docs/integrations/vercel}
 */
export function reportWebVitals(metric: NextWebVitalsMetric) {
  const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT;
  if (!url) return;

  const body = JSON.stringify({ route: window.__NEXT_DATA__.page, ...metric });

  if (navigator.sendBeacon) navigator.sendBeacon(url, body);
  else fetch(url, { body, method: "POST", keepalive: true });
}

export default MyApp;
