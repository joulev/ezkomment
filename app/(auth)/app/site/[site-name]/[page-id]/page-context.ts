"use client";
import "client-only";

import { createContext, useContext } from "react";
import useSWR, { KeyedMutator } from "swr";
import { internalSWRGenerator } from "~/app/(auth)/internal-fetch";
import { ClientPage } from "~/types/server";

export type ContextType = {
    page: ClientPage;
    mutate: KeyedMutator<ClientPage>;
};

export const PageContext = createContext<ContextType>({
    // LOL
    page: {
        id: "",
        title: "",
        url: "",
        autoApprove: false,
        totalCommentCount: 0,
        pendingCommentCount: 0,
        lastUpdated: 0,
        uid: "",
        siteId: "",
        comments: [],
    },
    mutate: async () => undefined,
});

export function usePageInit(fallback: ClientPage) {
    const { data, mutate } = useSWR(
        `/api/pages/${fallback.id}`,
        internalSWRGenerator<ClientPage>(),
        { fallbackData: fallback }
    );
    return { page: data!, mutate };
}

export const usePage = () => useContext(PageContext);
