import * as site from "~/server/crud/site";
import { ApiHandler, extractFirstQueryValue } from "~/server/next-connect";

export const getStatistics: ApiHandler = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    res.json(await site.getStatistics(req.uid!, siteId));
};
