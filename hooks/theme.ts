import { useContext, useEffect, useState } from "react";

import ModeContext from "~/context/mode";

import { Mode } from "~/types/utils.type";

/**
 * Check whether the current mode is a dark theme or not, especially for "system" mode.
 *
 * @param mode The current mode as "light", "dark" or "system"
 * @returns Whether the mode evaluates to a dark theme
 */
function modeIsDark(mode: Mode) {
    if (mode !== "system") return mode === "dark";
    return typeof window === "undefined"
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Initialise the mode global state.
 */
function useModeInit() {
    const [mode, setMode] = useState<Mode>("system");
    const [haveSetMode, setHaveSetMode] = useState(false); // to fix flickering on hydration

    useEffect(() => {
        const storedMode = localStorage.getItem("mode");
        if (storedMode) setMode(storedMode as Mode);
        setHaveSetMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("mode", mode);
        if (!haveSetMode) return;

        if (modeIsDark(mode)) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");

        document.documentElement.classList.add("changing-mode");
        setTimeout(() => document.documentElement.classList.remove("changing-mode"), 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    return { mode, setMode };
}

/**
 * Get the mode from the global context.
 * @returns The current mode
 */
const useMode = () => useContext(ModeContext);

/**
 * Get the *theme* from the current mode. Theme here means either light or dark, not including
 * "system".
 *
 * @returns The current theme
 *
 * @note If I use `useMode` with `modeisDark` directly, React hydration will fail. React sometimes
 * s*cks, after all.
 *
 * @see https://youtu.be/HyWYpM_S-2c
 */
const useTheme = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const mode = useMode().mode;
    useEffect(() => setTheme(modeIsDark(mode) ? "dark" : "light"), [mode]);
    return theme;
};

export { useModeInit, useMode, useTheme as default };
