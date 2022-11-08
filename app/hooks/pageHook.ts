import "client-only";
import { useContext } from "react";
import useSWR from "swr";
import PageContext from "~/app/context/pageContext";
import { internalSWRGenerator } from "~/client/lib/fetcher";
import { ClientPage } from "~/types/server";

export function usePageInit(pageId: string) {
    const { data: page, mutate } = useSWR(
        `/api/pages/${pageId}`,
        internalSWRGenerator<ClientPage | undefined>()
    );
    return { page, mutate };
}

export function usePage() {
    return useContext(PageContext);
}
