import { useMode } from "@client/context/mode";

type Theme = "light" | "dark";

export default function useCurrentTheme(defaultTheme: Theme = "light"): Theme {
    const mode = useMode()?.mode ?? null;
    if (!mode) return defaultTheme;
    if (mode === "dark" || mode === "light") return mode;
    if (typeof window === "undefined") return defaultTheme;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
        return "dark";
    return defaultTheme;
}
