import { AppProps } from "next/app";

import BreakpointContext from "@client/context/breakpoint";
import ModeContext from "@client/context/mode";
import { useBreakpointInit } from "@client/hooks/breakpoint";
import useNProgress from "@client/hooks/nprogress";
import { useModeInit } from "@client/hooks/theme";

import { ErrorBoundary } from "@client/layouts/errors";

import "@client/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useNProgress();
  const { mode, setMode } = useModeInit();
  const breakpoint = useBreakpointInit();
  return (
    <ErrorBoundary>
      <ModeContext.Provider value={{ mode, setMode }}>
        <BreakpointContext.Provider value={breakpoint}>
          <Component {...pageProps} />
        </BreakpointContext.Provider>
      </ModeContext.Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
