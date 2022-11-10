import * as StatisticUtils from "~/old/server/utils/crud/statisticUtils";

import { SiteStatistics } from "~/old/types/server";
import { ApiResponse, AuthenticatedApiRequest } from "~/old/types/server/nextApi.type";

import { extractFirstQueryValue } from "../utils/nextHandlerUtils";

export async function getSiteStatistic(
    req: AuthenticatedApiRequest,
    res: ApiResponse<SiteStatistics>
) {
    const { uid } = req.user ?? {};
    const { siteId } = extractFirstQueryValue(req);
    const data = await StatisticUtils.getSiteStatistic(uid, siteId);
    res.status(200).json({ message: "Got site statistic", data });
}
