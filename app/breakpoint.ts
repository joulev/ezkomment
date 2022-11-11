import "client-only";
import { createContext, useContext, useEffect, useState } from "react";
import theme from "~/config/tailwind-theme";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "unknown";

export const BreakpointContext = createContext<Breakpoint>("unknown");

/**
 * Get the current browser breakpoint.
 *
 * @returns The current breakpoint of the viewport (consistent with breakpoint prefixes
 * in Tailwind CSS). If on serverside, returns `unknown`.
 */
const getBreakpoint = (): Breakpoint =>
    typeof window === "undefined" || !theme || !theme.screens
        ? "unknown"
        : (Object.entries({ xs: "0px", ...theme.screens }) as [Breakpoint, string][])
              .reverse()
              .find(([_, width]) => window.matchMedia(`(min-width: ${width})`).matches)![0];

/**
 * Initialise the breakpoint global state in `_app.ts`.
 */
export function useBreakpointInit() {
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
export const useBreakpoint = () => useContext(BreakpointContext);
