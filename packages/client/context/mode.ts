import { Dispatch, SetStateAction, createContext } from "react";

import { Mode } from "@client/types/utils.type";

const ModeContext = createContext<{
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
}>({
    mode: "system",
    setMode: () => {},
});

export default ModeContext;
