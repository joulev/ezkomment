import { useContext, useEffect, useState } from "react";

import ModeContext from "@client/context/mode";

import { Mode } from "@client/types/utils.type";

function modeIsDark(mode: Mode) {
    if (typeof window === "undefined") return false;
    return (
        mode === "dark" ||
        (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
}

function useModeInit() {
    const [mode, setMode] = useState<Mode>("system");

    useEffect(() => {
        const storedMode = localStorage.getItem("mode");
        if (storedMode) setMode(storedMode as Mode);
    }, []);

    useEffect(() => {
        localStorage.setItem("mode", mode);
        if (modeIsDark(mode)) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [mode]);

    return { mode, setMode };
}

const useMode = () => useContext(ModeContext);

const useTheme = () => (modeIsDark(useMode()?.mode ?? "system") ? "dark" : "light");

export { useModeInit, useMode, useTheme as default };
