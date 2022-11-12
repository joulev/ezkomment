import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { get } from "~/server/crud/site";
import { getUidFromSessionCookie } from "~/server/utils/auth";
import { ClientSite } from "~/types/server";

export const getSite = cache(async (siteId?: string): Promise<ClientSite | undefined> => {
    try {
        if (!siteId) return undefined;
        const sessionCookie = cookies().get("session");
        const uid = await getUidFromSessionCookie(sessionCookie?.value);
        const site = await get(uid, siteId);
        return site;
    } catch (e) {
        return undefined;
    }
});
