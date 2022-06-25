import * as SiteUtils from "~/server/utils/crud/siteUtils";
import { deleteSiteIconById } from "~/server/utils/crud/imageUtils";
import { deleteSitePagesById, listSitePagesById } from "~/server/utils/crud/pageUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ClientSite, CreateSiteBodyParams, Site, UpdateSiteBodyParams } from "~/types/server";
import { ApiResponse, AuthenticatedApiRequest } from "~/types/server/nextApi.type";

export async function getSite(req: AuthenticatedApiRequest, res: ApiResponse<ClientSite>) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const data = await SiteUtils.getClientSiteById(uid, siteId);
    res.status(200).json({ message: "Got site information", data });
}

export async function createSite(req: AuthenticatedApiRequest, res: ApiResponse<Site>) {
    const { uid } = req.user;
    const data: CreateSiteBodyParams = req.body;
    const result = await SiteUtils.createSite(uid, data);
    res.status(201).json({ message: "Created site", data: result });
}

export async function updateSite(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const data: UpdateSiteBodyParams = req.body;
    await SiteUtils.updateSiteById(uid, siteId, data);
    res.status(200).json({ message: "Updated site" });
}

export async function deleteSite(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    await SiteUtils.deleteSiteById(uid, siteId);
    await Promise.all([
        deleteSiteIconById(siteId), // delete icon
        deleteSitePagesById(siteId), // delete ALL pages
    ]);
    res.status(200).json({ message: "Deleted site" });
}

/////////////////////////
// Interact with pages //
/////////////////////////

export async function listSitePages(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const data = await listSitePagesById(siteId);
    res.status(200).json({ message: "Listed all pages", data });
}
