import { createContext } from "react";

import { Breakpoint } from "@client/types/utils.type";

const BreakpointContext = createContext<Breakpoint>("unknown");

export default BreakpointContext;
