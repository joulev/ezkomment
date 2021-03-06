import * as CustomisationUtils from "~/server/utils/crud/customisationUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { SiteCustomisation, UpdateSiteCustomisationBodyParams } from "~/types/server";
import { ApiRequest, ApiResponse, AuthenticatedApiRequest } from "~/types/server/nextApi.type";

export async function getSiteCustomisation(req: ApiRequest, res: ApiResponse<SiteCustomisation>) {
    const { siteId } = extractFirstQueryValue(req);
    const data = await CustomisationUtils.getSiteCustomisation(siteId);
    res.status(200).json({ message: "Got site's customisation", data });
}

export async function updateSiteCustomisation(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const data: UpdateSiteCustomisationBodyParams = req.body;
    await CustomisationUtils.updateSiteCustomisation(uid, siteId, data);
    res.status(200).json({ message: "Updated site's customisation" });
}
