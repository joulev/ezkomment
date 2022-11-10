import * as SiteUtils from "~/old/server/utils/crud/siteUtils";
import { deleteSiteIcon } from "~/old/server/utils/crud/imageUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { ClientSite, CreateSiteBodyParams, Site, UpdateSiteBodyParams } from "~/old/types/server";
import { ApiResponse, AuthenticatedApiRequest } from "~/old/types/server/nextApi.type";

export async function getSite(req: AuthenticatedApiRequest, res: ApiResponse<ClientSite>) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const data = await SiteUtils.getClientSiteWithUid(uid, siteId);
    res.status(200).json({ message: "Got site information", data });
}

export async function createSite(req: AuthenticatedApiRequest, res: ApiResponse<Site>) {
    const { uid } = req.user;
    const data: CreateSiteBodyParams = req.body;
    const result = await SiteUtils.createSiteWithUid(uid, data);
    res.status(201).json({ message: "Created site", data: result });
}

export async function updateSite(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const data: UpdateSiteBodyParams = req.body;
    await SiteUtils.updateSiteWithUid(uid, siteId, data);
    res.status(200).json({ message: "Updated site" });
}

export async function deleteSite(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    await SiteUtils.deleteSiteWithUid(uid, siteId);
    await Promise.all([
        deleteSiteIcon(siteId), // delete icon
        SiteUtils.deleteSitePages(siteId), // delete ALL pages
    ]);
    res.status(200).json({ message: "Deleted site" });
}

/////////////////////////
// Interact with pages //
/////////////////////////

export async function listSitePages(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const data = await SiteUtils.listSitePages(siteId);
    res.status(200).json({ message: "Listed all pages", data });
}
