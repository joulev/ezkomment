import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { getUserById, listUserSites } from "~/server/crud/user";
import { getUidFromSessionCookie } from "~/server/utils/auth";
import { ClientUser } from "~/types/server";

export const getUser = cache(async (): Promise<ClientUser | undefined> => {
    try {
        const sessionCookie = cookies().get("session");
        const uid = await getUidFromSessionCookie(sessionCookie?.value);
        const user = await getUserById(uid);
        const sites = await listUserSites(uid);
        return { ...user, sites };
    } catch (e) {
        return undefined;
    }
});