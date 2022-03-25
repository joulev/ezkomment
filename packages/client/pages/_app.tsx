import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import ModeContext from "@client/context/mode";
import ScreenWidthContext from "@client/context/screenWidth";
import getScreenWidth from "@client/lib/getScreenWidth";

import { Breakpoint, Mode } from "@client/types/utils.type";

import "@client/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<Mode>("system");
  const [screenWidth, setScreenWidth] = useState<Breakpoint>("unknown");

  const handleResize = () => setScreenWidth(getScreenWidth());

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) setMode(storedMode as Mode);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
    const dark =
      mode !== "light" &&
      (mode === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.querySelector("html")?.classList.add("dark");
    else document.querySelector("html")?.classList.remove("dark");
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <ScreenWidthContext.Provider value={screenWidth}>
        <Component {...pageProps} />
      </ScreenWidthContext.Provider>
    </ModeContext.Provider>
  );
}

export default MyApp;
