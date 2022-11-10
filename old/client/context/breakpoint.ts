import { createContext } from "react";

import { BreakpointContextType } from "~/old/types/client/utils.type";

const BreakpointContext = createContext<BreakpointContextType>("unknown");

export default BreakpointContext;
