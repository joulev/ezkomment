import { createContext } from "react";

import { BreakpointContextType } from "~/types/client/utils.type";

const BreakpointContext = createContext<BreakpointContextType>("unknown");

export default BreakpointContext;
