import * as page from "~/server/crud/page";
import { ApiHandler, extractFirstQueryValue } from "~/server/next-connect";
import { ClientPage, Comment } from "~/types/server";

export const get: ApiHandler<ClientPage> = async (req, res) => {
    const { pageId } = extractFirstQueryValue(req);
    res.json(await page.get(req.uid!, pageId));
};

export const getApprovedComments: ApiHandler<Comment[]> = async (req, res) => {
    const { pageId } = extractFirstQueryValue(req);
    res.json(await page.getApprovedComments(pageId));
};

export const create: ApiHandler<{ id: string }> = async (req, res) => {
    const { id } = await page.create(req.uid!, req.body);
    res.json({ id });
};

export const update: ApiHandler = async (req, res) => {
    const { pageId } = extractFirstQueryValue(req);
    await page.update(req.uid!, pageId, req.body);
    res.json({});
};

export const remove: ApiHandler = async (req, res) => {
    const { pageId } = extractFirstQueryValue(req);
    await page.remove(req.uid!, pageId);
    res.json({});
};
