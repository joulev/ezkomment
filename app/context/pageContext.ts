"use client";
// have to use this weird filename because page.ts is taken by Next.js already

import { createContext } from "react";
import { KeyedMutator } from "swr";
import { ClientPage } from "~/types/server";

export type PageContextProps = {
    page: ClientPage | undefined;
    mutate: KeyedMutator<ClientPage | undefined>;
};

const PageContext = createContext<PageContextProps>({
    page: undefined,
    mutate: async () => undefined,
});

export default PageContext;
