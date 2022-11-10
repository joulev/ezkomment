import { createContext } from "react";

import { PageContextProps } from "~/old/types/client/page.type";

const PageContext = createContext<PageContextProps>({
    page: undefined,
    mutate: async () => undefined,
});

export default PageContext;
