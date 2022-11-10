import { createContext } from "react";

import { SiteContextProps } from "~/old/types/client/page.type";

const SiteContext = createContext<SiteContextProps>({
    site: undefined,
    mutate: async () => undefined,
});

export default SiteContext;
