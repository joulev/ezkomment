import * as CustomisationUtils from "~/old/server/utils/crud/customisationUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { SiteCustomisation, UpdateSiteCustomisationBodyParams } from "~/old/types/server";
import { ApiRequest, ApiResponse, AuthenticatedApiRequest } from "~/old/types/server/nextApi.type";

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
