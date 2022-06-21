import { useContext } from "react";
import useSWR from "swr";

import SiteContext from "~/client/context/site";
import { internalSWRGenerator } from "~/client/lib/fetcher";

import { Site } from "~/types/server";

export function useSiteInit(siteId: string) {
    const { data: site, mutate } = useSWR(
        `/api/sites/${siteId}`,
        internalSWRGenerator<Site | undefined>()
    );
    return { site, mutate };
}

export function useSite() {
    return useContext(SiteContext);
}
