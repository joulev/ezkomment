import type { AppProps } from "next/app";
import { useState } from "react";
import ModeContext from "@client/context/mode";
import "@client/styles/globals.css";
import type { Mode } from "@client/types/utils.type";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<Mode>("light");
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <Component {...pageProps} />
    </ModeContext.Provider>
  );
}

export default MyApp;
