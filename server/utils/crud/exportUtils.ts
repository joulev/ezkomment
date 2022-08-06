import { ExportPage, ExportSite, ExportUser } from "~/types/server";

import { getClientPageWithUid } from "./pageUtils";

export async function exportPageWithUid(uid: string, pageId: string): Promise<ExportPage> {
    return await getClientPageWithUid(uid, pageId);
}
