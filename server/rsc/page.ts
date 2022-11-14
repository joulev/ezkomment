import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { get } from "~/server/crud/page";
import { getUidFromSessionCookie } from "~/server/utils/auth";
import { ClientPage } from "~/types/server";

export const getPage = cache(async (pageId?: string): Promise<ClientPage | undefined> => {
    try {
        if (!pageId) return undefined;
        const sessionCookie = cookies().get("session");
        const uid = await getUidFromSessionCookie(sessionCookie?.value);
        const page = await get(uid, pageId);
        return page;
    } catch (e) {
        return undefined;
    }
});
