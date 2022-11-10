import * as ExportUtils from "~/old/server/utils/crud/exportUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { ExportPage, ExportSite, ExportUser } from "~/old/types/server";
import { ApiRequest, ApiResponse, AuthenticatedApiRequest } from "~/old/types/server/nextApi.type";

export async function exportPage(req: AuthenticatedApiRequest, res: ApiResponse<ExportPage>) {
    const { uid } = req.user;
    const { pageId } = extractFirstQueryValue(req);
    const data = await ExportUtils.exportPageWithUid(uid, pageId);
    res.status(200).json({ message: "Exported page", data });
}

export async function exportSite(req: AuthenticatedApiRequest, res: ApiResponse<ExportSite>) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const data = await ExportUtils.exportSiteWithUid(uid, siteId);
    res.status(200).json({ message: "Exported site", data });
}

export async function exportUser(req: ApiRequest, res: ApiResponse<ExportUser>) {
    const { uid } = extractFirstQueryValue(req);
    const data = await ExportUtils.exportUserById(uid);
    res.status(200).json({ message: "Exported user", data });
}
