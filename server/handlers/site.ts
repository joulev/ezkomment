import * as site from "~/server/crud/site";
import {
    ApiHandler,
    ApiRequestWithFormData,
    ApiResponse,
    extractFirstQueryValue,
} from "~/server/next-connect";
import { UploadSiteIcon } from "~/server/crud/images";
import { ClientSite, SiteStatistics, SiteTemplate } from "~/types/server";

export const get: ApiHandler<ClientSite> = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    res.json(await site.get(req.uid!, siteId));
};

export const getStatistics: ApiHandler<SiteStatistics> = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    res.json(await site.getStatistics(req.uid!, siteId));
};

export const getTemplate: ApiHandler<SiteTemplate> = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    res.json(await site.getTemplate(req.uid!, siteId));
};

export const create: ApiHandler = async (req, res) => {
    await site.create(req.uid!, req.body);
    res.json({});
};

export const update: ApiHandler = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    await site.update(req.uid!, siteId, req.body);
    res.json({});
};

export async function uploadIcon(req: ApiRequestWithFormData, res: ApiResponse) {
    const uid = req.uid!;
    const { siteId } = extractFirstQueryValue(req);
    const util = UploadSiteIcon.instance();
    const iconURL = util.getUrl(uid);
    await site.update(uid, siteId, { iconURL });
    await util.upload(uid, req.file);
    res.json({});
}

export const updateTemplate: ApiHandler = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    await site.updateTemplate(req.uid!, siteId, req.body);
    res.json({});
};

export const remove: ApiHandler = async (req, res) => {
    const { siteId } = extractFirstQueryValue(req);
    await site.remove(req.uid!, siteId);
    res.json({});
};
