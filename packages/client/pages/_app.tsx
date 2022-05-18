import { MDXProvider } from "@mdx-js/react";

import BreakpointContext from "@client/context/breakpoint";
import ModeContext from "@client/context/mode";
import { useBreakpointInit } from "@client/hooks/breakpoint";
import useNProgress from "@client/hooks/nprogress";
import { useModeInit } from "@client/hooks/theme";

import A from "@client/components/anchor";
import PostHeading from "@client/components/postHeading";
import { ErrorBoundary } from "@client/layouts/errors";

import { AppPropsWithLayout } from "@client/types/utils.type";

import "@client/styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useNProgress();
  const { mode, setMode } = useModeInit();
  const breakpoint = useBreakpointInit();
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <ErrorBoundary>
      <ModeContext.Provider value={{ mode, setMode }}>
        <BreakpointContext.Provider value={breakpoint}>
          {getLayout(
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
              <Component {...pageProps} />
            </MDXProvider>
          )}
        </BreakpointContext.Provider>
      </ModeContext.Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
