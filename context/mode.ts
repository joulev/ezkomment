import { createContext } from "react";

import { ModeContextType } from "@client/types/utils.type";

const ModeContext = createContext<ModeContextType>({
    mode: "system",
    setMode: () => {},
});

export default ModeContext;
