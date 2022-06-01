import { Request, Response } from "express";

import * as SiteUtils from "@server/utils/siteUtils";
import { CreateSiteRequest, UpdateSiteRequest } from "@server/models";
import { reportBadRequest } from "@server/utils/extraUtils";

export async function getSite(req: Request, res: Response) {
    const siteId: string = req.params.siteId;
    try {
        res.status(200).json({
            message: "Successfully get site information",
            data: await SiteUtils.getSiteById(siteId),
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get site's information");
    }
}

export async function createSite(req: Request, res: Response) {
    try {
        const data: CreateSiteRequest = req.body;
        await SiteUtils.createSite(data);
        res.status(201).json({ message: "Successfully created site" });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

export async function updateSite(req: Request, res: Response) {
    const siteId: string = req.params.siteId;
    try {
        const data: UpdateSiteRequest = req.body;
        await SiteUtils.updateSiteById(siteId, data);
        res.status(200).json({ message: "Successfully updated site information" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update site information");
    }
}

export async function deleteSite(req: Request, res: Response) {
    const siteId: string = req.params.siteId;
    try {
        await SiteUtils.deleteSiteById(siteId);
        res.status(200).json({ message: "Successfully deleted site" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete site and its content");
    }
}
