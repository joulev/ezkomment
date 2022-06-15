import { NextApiRequest } from "next";

import * as PageUtils from "~/server/utils/crud/pageUtils";
import { deletePageCommentsById, listPageCommentsById } from "~/server/utils/crud/commentUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { CreatePageBodyParams, CreatePagePathParams, UpdatePageBodyParams } from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function getPage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        const data = await PageUtils.getPageById(pageId);
        res.status(200).json({ message: "Got page information", data });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function createPage(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req) as CreatePagePathParams;
    const data: CreatePageBodyParams = req.body;
    try {
        await PageUtils.createPage({ siteId, ...data });
        res.status(201).json({ message: "Created new page" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function updatePage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const data: UpdatePageBodyParams = req.body;
    try {
        await PageUtils.updatePageById(pageId, data);
        res.status(200).json({ message: "Updated page" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function deletePage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        await deletePageCommentsById(pageId);
        await PageUtils.deletePageById(pageId);
        res.status(200).json({ message: "Deleted page" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function listPageComments(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        const data = await listPageCommentsById(pageId);
        res.status(200).json({ message: "Listed all comments", data });
    } catch (error) {
        reportBadRequest(res, error);
    }
}
