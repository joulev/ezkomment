import * as site from "~/server/crud/site";
import { ApiHandler, extractFirstQueryValue } from "~/server/next-connect";
import { SiteStatistics, SiteTemplate, UpdateSiteTemplateBodyParams } from "~/types/server";

export const getStatistics: ApiHandler<SiteStatistics> = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    res.json(await site.getStatistics(req.uid!, siteId));
};

export const getTemplate: ApiHandler<SiteTemplate> = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    res.json(await site.getTemplate(req.uid!, siteId));
};

export const updateTemplate: ApiHandler = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    const data: UpdateSiteTemplateBodyParams = req.body;
    await site.updateTemplate(req.uid!, siteId, data);
    res.json({});
};
