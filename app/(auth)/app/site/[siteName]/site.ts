"use client";
import "client-only";

import { createContext, useContext } from "react";
import useSWR, { KeyedMutator } from "swr";
import { internalSWRGenerator } from "~/app/(auth)/internal-fetch";
import { ClientSite } from "~/types/server";

export type ContextType = {
    site: ClientSite;
    mutate: KeyedMutator<ClientSite>;
};

export const SiteContext = createContext<ContextType>({
    // LOL
    site: {
        id: "",
        name: "",
        iconURL: null,
        domain: "",
        pageCount: 0,
        totalCommentCount: 0,
        pendingCommentCount: 0,
        lastUpdated: 0,
        uid: "",
        pages: [],
    },
    mutate: async () => undefined,
});

export function useSiteInit(fallback: ClientSite) {
    const { data, mutate } = useSWR(
        `/api/site/${fallback.name}`,
        internalSWRGenerator<ClientSite>(),
        { fallbackData: fallback }
    );
    return { site: data!, mutate };
}

export const useSite = () => useContext(SiteContext);
