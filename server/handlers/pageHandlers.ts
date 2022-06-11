import { NextApiRequest } from "next";

import * as PageUtils from "~/server/utils/pageUtils";
import { deletePageCommentsById, listPageCommentsById } from "~/server/utils/commentUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { CreatePageBodyParams, CreatePagePathParams, UpdatePageBodyParams } from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function getPage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        const result = await PageUtils.getPageById(pageId);
        res.status(200).json({
            message: "Successfully got page information",
            data: result,
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get page's information");
    }
}

export async function createPage(req: NextApiRequest, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req) as CreatePagePathParams;
    const data: CreatePageBodyParams = req.body;
    try {
        await PageUtils.createPage({
            siteId,
            ...data,
        });
        res.status(201).json({ message: "Successfully created new page" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new page");
    }
}

export async function updatePage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const data: UpdatePageBodyParams = req.body;
    try {
        await PageUtils.updatePageById(pageId, data);
        res.status(200).json({ message: "Successfully updated page" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update page");
    }
}

export async function deletePage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        await PageUtils.deletePageById(pageId);
        await deletePageCommentsById(pageId);
        res.status(200).json({ message: "Successfully deleted page and its content" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete page and its content");
    }
}

export async function listPageComments(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        const result = await listPageCommentsById(pageId);
        res.status(200).json({
            message: "Listed all pages",
            data: result,
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}
