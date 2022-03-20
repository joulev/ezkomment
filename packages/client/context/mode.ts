import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Mode } from "@client/types/utils.type";

type ModeContextType = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};
const ModeContext = createContext<ModeContextType | null>(null);
export default ModeContext;
