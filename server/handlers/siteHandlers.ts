import { NextApiRequest } from "next";

import * as SiteUtils from "~/server/utils/siteUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";
import { deleteSitePagesById, listSitePagesById } from "~/server/utils/pageUtils";

import { CreateSiteBodyParams, CreateSitePathParams, UpdateSiteBodyParams } from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function getSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    try {
        const result = await SiteUtils.getSiteById(siteId);
        res.status(200).json({
            message: "Successfully get site information",
            data: result,
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get site's information");
    }
}

export async function createSite(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req) as CreateSitePathParams;
    const data: CreateSiteBodyParams = req.body;
    try {
        await SiteUtils.createSite({ uid, ...data });
        res.status(201).json({ message: "Successfully created site" });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

export async function updateSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const data: UpdateSiteBodyParams = req.body;
    try {
        await SiteUtils.updateSiteById(siteId, data);
        res.status(200).json({ message: "Successfully updated site information" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update site information");
    }
}

export async function deleteSite(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    try {
        await SiteUtils.deleteSiteById(siteId);
        await deleteSitePagesById(siteId);
        res.status(200).json({ message: "Successfully deleted site" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete site and its content");
    }
}

/////////////////////////
// Interact with pages //
/////////////////////////

export async function listSitePages(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    try {
        const result = await listSitePagesById(siteId);
        res.status(200).json({
            message: "Listed all pages",
            data: result,
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}
