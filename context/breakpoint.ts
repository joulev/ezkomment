import { createContext } from "react";

import { BreakpointContextType } from "@client/types/utils.type";

const BreakpointContext = createContext<BreakpointContextType>("unknown");

export default BreakpointContext;
