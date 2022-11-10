import { useContext } from "react";
import useSWR from "swr";

import SiteContext from "~/old/client/context/site";
import { internalSWRGenerator } from "~/old/client/lib/fetcher";

import { ClientSite } from "~/old/types/server";

export function useSiteInit(siteId: string) {
    const { data: site, mutate } = useSWR(
        `/api/sites/${siteId}`,
        internalSWRGenerator<ClientSite | undefined>()
    );
    return { site, mutate };
}

export function useSite() {
    return useContext(SiteContext);
}
