import { createContext, useContext } from "react";

import { Breakpoint } from "@client/types/utils.type";

const ScreenWidthContext = createContext<Breakpoint>("unknown");

/**
 * Get the current screen breakpoint.
 *
 * @returns The current screen breakpoint (same as Tailwind breakpoints)
 */
export const useScreenWidth = () => useContext(ScreenWidthContext);

export default ScreenWidthContext;
