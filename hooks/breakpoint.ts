import { useContext, useEffect, useState } from "react";

import theme from "@client/config/tailwindTheme";
import BreakpointContext from "@client/context/breakpoint";

import { Breakpoint } from "@client/types/utils.type";

/**
 * Get the current browser breakpoint.
 *
 * @returns The current breakpoint of the viewport (consistent with breakpoint prefixes
 * in Tailwind CSS). If on serverside, returns `unknown`.
 */
const getBreakpoint = (): Breakpoint =>
    typeof window === "undefined" || !theme.screens
        ? "unknown"
        : (Object.entries({ xs: "0px", ...theme.screens }) as [Breakpoint, string][])
              .reverse()
              .find(([_, width]) => window.matchMedia(`(min-width: ${width})`).matches)![0];

/**
 * Initialise the breakpoint global state in `_app.ts`.
 */
function useBreakpointInit() {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>("unknown");
    const handleResize = () => setBreakpoint(getBreakpoint());
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return breakpoint;
}

/**
 * Get the current screen breakpoint.
 *
 * @returns The current screen breakpoint (same as Tailwind breakpoints)
 */
const useBreakpoint = () => useContext(BreakpointContext);

export { useBreakpoint as default, useBreakpointInit };
