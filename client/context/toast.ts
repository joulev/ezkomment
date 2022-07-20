import { createContext } from "react";

import { SetToastContextType } from "~/types/client/utils.type";

const SetToastContext = createContext<SetToastContextType>(() => {});

export default SetToastContext;
