import { Dispatch, SetStateAction, createContext, useContext } from "react";

import { Mode } from "@client/types/utils.type";

type ModeContextType = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};
const ModeContext = createContext<ModeContextType | null>(null);

export const useMode = () => useContext(ModeContext);

export default ModeContext;
