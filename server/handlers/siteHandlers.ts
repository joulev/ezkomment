import { NextApiRequest } from "next";

import * as SiteUtils from "~/server/utils/crud/siteUtils";
import { deleteSiteIconById } from "~/server/utils/crud/imageUtils";
import { deleteSitePagesById, listSitePagesById } from "~/server/utils/crud/pageUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { CreateSiteBodyParams, CreateSitePathParams, UpdateSiteBodyParams } from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function getSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    try {
        const data = await SiteUtils.getSiteById(siteId);
        res.status(200).json({ message: "Got site information", data });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function createSite(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req) as CreateSitePathParams;
    const data: CreateSiteBodyParams = req.body;
    try {
        await SiteUtils.createSite({ uid, ...data });
        res.status(201).json({ message: "Created site" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function updateSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const data: UpdateSiteBodyParams = req.body;
    try {
        await SiteUtils.updateSiteById(siteId, data);
        res.status(200).json({ message: "Updated site" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function deleteSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    try {
        await deleteSiteIconById(siteId); // delete icon
        await deleteSitePagesById(siteId); // delete ALL pages
        await SiteUtils.deleteSiteById(siteId);
        res.status(200).json({ message: "Deleted site" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

/////////////////////////
// Interact with pages //
/////////////////////////

export async function listSitePages(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    try {
        const data = await listSitePagesById(siteId);
        res.status(200).json({ message: "Listed all pages", data });
    } catch (error) {
        reportBadRequest(res, error);
    }
}
