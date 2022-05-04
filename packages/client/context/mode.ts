import { Dispatch, SetStateAction, createContext } from "react";

import { Mode } from "@client/types/utils.type";

type ModeContextType = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};

const ModeContext = createContext<ModeContextType | null>(null);

export default ModeContext;
