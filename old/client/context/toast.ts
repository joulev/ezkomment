import { createContext } from "react";

import { SetToastContextType } from "~/old/types/client/utils.type";

const SetToastContext = createContext<SetToastContextType>(() => {});

export default SetToastContext;
