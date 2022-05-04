import { useMode } from "@client/context/mode";

type Theme = "light" | "dark";

/**
 * Get the current theme (light or dark).
 *
 * @param defaultTheme The default theme to return as fallback
 * @returns The current theme
 */
export default function useCurrentTheme(defaultTheme: Theme = "light"): Theme {
    const mode = useMode()?.mode ?? null;
    if (!mode) return defaultTheme;
    if (mode === "dark" || mode === "light") return mode;
    if (typeof window === "undefined") return defaultTheme;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
        return "dark";
    return defaultTheme;
}
