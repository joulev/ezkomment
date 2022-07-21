import * as StatisticUtils from "~/server/utils/crud/statisticUtils";

import { SiteStatistics } from "~/types/server";
import { ApiResponse, AuthenticatedApiRequest } from "~/types/server/nextApi.type";

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
