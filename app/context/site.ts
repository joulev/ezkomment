"use client";

import { createContext } from "react";
import { KeyedMutator } from "swr";
import { ClientSite } from "~/types/server";

export type SiteContextProps = {
    site: ClientSite | undefined;
    mutate: KeyedMutator<ClientSite | undefined>;
};

const SiteContext = createContext<SiteContextProps>({
    site: undefined,
    mutate: async () => undefined,
});

export default SiteContext;
