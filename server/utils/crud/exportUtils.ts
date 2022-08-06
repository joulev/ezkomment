import { ExportPage, ExportSite, ExportUser } from "~/types/server";

import { getSiteCustomisation } from "./customisationUtils";
import { getClientPageWithUid } from "./pageUtils";
import { getClientSiteWithUid } from "./siteUtils";

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

export async function exportUserById(uid: string): Promise<ExportUser | undefined> {
    return undefined;
}
