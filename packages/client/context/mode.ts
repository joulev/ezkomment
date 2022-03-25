import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Mode } from "@client/types/utils.type";

type ModeContextType = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};
const ModeContext = createContext<ModeContextType | null>(null);

export const useMode = () => useContext(ModeContext);

export default ModeContext;
