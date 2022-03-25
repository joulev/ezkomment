import theme from "@client/config/tailwind-theme";
import type { Breakpoint } from "@client/types/utils.type";

/**
 * Get the current browser breakpoint.
 *
 * @returns The current breakpoint of the viewport (consistent with breakpoint prefixes
 * in Tailwind CSS). If on serverside, returns `unknown`.
 */
const getScreenWidth = (): Breakpoint =>
    typeof window === "undefined" || !theme.screens
        ? "unknown"
        : (Object.entries({ xs: "0px", ...theme.screens }) as [Breakpoint, string][])
              .reverse()
              .find(([_, width]) => window.matchMedia(`(min-width: ${width})`).matches)![0];

export default getScreenWidth;
