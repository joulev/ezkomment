import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Mode } from "@client/types/utils.type";

type ModeContextType = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};
const ModeContext = createContext<ModeContextType | null>(null);
export default ModeContext;
