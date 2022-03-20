import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import ModeContext from "@client/context/mode";
import "@client/styles/globals.css";
import type { Mode } from "@client/types/utils.type";

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
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <Component {...pageProps} />
    </ModeContext.Provider>
  );
}

export default MyApp;
