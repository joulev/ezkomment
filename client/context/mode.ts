import { createContext } from "react";

import { ModeContextType } from "~/types/client/utils.type";

const ModeContext = createContext<ModeContextType>({
    mode: "system",
    setMode: () => {},
});

export default ModeContext;
