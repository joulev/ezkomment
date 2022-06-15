import { NextApiRequest } from "next";

import * as SiteUtils from "~/server/utils/crud/siteUtils";
import { deleteSiteIconById } from "~/server/utils/crud/imageUtils";
import { deleteSitePagesById, listSitePagesById } from "~/server/utils/crud/pageUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { CreateSiteBodyParams, CreateSitePathParams, UpdateSiteBodyParams } from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function getSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const data = await SiteUtils.getSiteById(siteId);
    res.status(200).json({ message: "Got site information", data });
}

export async function createSite(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req) as CreateSitePathParams;
    const data: CreateSiteBodyParams = req.body;
    await SiteUtils.createSite({ uid, ...data });
    res.status(201).json({ message: "Created site" });
}

export async function updateSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const data: UpdateSiteBodyParams = req.body;
    await SiteUtils.updateSiteById(siteId, data);
    res.status(200).json({ message: "Updated site" });
}

export async function deleteSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    await SiteUtils.deleteSiteById(siteId);
    await Promise.all([
        deleteSiteIconById(siteId), // delete icon
        deleteSitePagesById(siteId), // delete ALL pages
    ]);
    res.status(200).json({ message: "Deleted site" });
}

/////////////////////////
// Interact with pages //
/////////////////////////

export async function listSitePages(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const data = await listSitePagesById(siteId);
    res.status(200).json({ message: "Listed all pages", data });
}
