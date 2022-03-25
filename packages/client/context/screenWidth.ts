import { createContext, useContext } from "react";

import { Breakpoint } from "@client/types/utils.type";

const ScreenWidthContext = createContext<Breakpoint>("unknown");

export const useScreenWidth = () => useContext(ScreenWidthContext);

export default ScreenWidthContext;
