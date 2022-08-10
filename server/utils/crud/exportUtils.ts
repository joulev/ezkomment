import { ExportPage, ExportSite, ExportUser, User } from "~/types/server";

import { getSiteCustomisation } from "./customisationUtils";
import { getClientPageWithUid } from "./pageUtils";
import { getClientSiteWithUid } from "./siteUtils";
import { getUserById, listUserSites } from "./userUtils";

export async function exportPageWithUid(uid: string, pageId: string): Promise<ExportPage> {
    return await getClientPageWithUid(uid, pageId);
}

export async function exportSiteWithUid(uid: string, siteId: string): Promise<ExportSite> {
    const { pages: rawPages, ...rest } = await getClientSiteWithUid(uid, siteId);
    const [{ customisation }, ...pages] = await Promise.all([
        getSiteCustomisation(siteId),
        ...rawPages.map(page => exportPageWithUid(uid, page.id)),
    ]);
    return { ...rest, pages, customisation };
}

export async function exportUserById(uid: string): Promise<ExportUser> {
    const rawUser: User = await getUserById(uid);
    const rawSites = await listUserSites(uid);
    const sites = await Promise.all(rawSites.map(site => exportSiteWithUid(uid, site.id)));
    return { ...rawUser, sites };
}
