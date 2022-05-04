import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import BreakpointContext from "@client/context/breakpoint";
import ModeContext from "@client/context/mode";
import { useBreakpointInit } from "@client/hooks/breakpoint";
import useNProgress from "@client/hooks/nprogress";

import { ErrorBoundary } from "@client/layouts/errors";

import { Mode } from "@client/types/utils.type";

import "@client/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) setMode(storedMode as Mode);
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
    const dark =
      mode !== "light" &&
      (mode === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.querySelector("html")?.classList.add("dark");
    else document.querySelector("html")?.classList.remove("dark");
  }, [mode]);

  useNProgress();
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
