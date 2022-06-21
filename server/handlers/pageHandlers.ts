import { NextApiRequest } from "next";

import * as PageUtils from "~/server/utils/crud/pageUtils";
import { deletePageCommentsById, listPageCommentsById } from "~/server/utils/crud/commentUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { CreatePageBodyParams, UpdatePageBodyParams } from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function getPage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const data = await PageUtils.getPageById(pageId);
    const comments = await listPageCommentsById(pageId);
    res.status(200).json({ message: "Got page information", data: { ...data, comments } });
}

export async function createPage(req: NextApiRequest, res: ApiResponse) {
    const data: CreatePageBodyParams = req.body;
    const result = await PageUtils.createPage({
        ...data,
        totalCommentCount: 0,
        pendingCommentCount: 0,
    });
    res.status(201).json({ message: "Created new page", data: result });
}

export async function updatePage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const data: UpdatePageBodyParams = req.body;
    await PageUtils.updatePageById(pageId, data);
    res.status(200).json({ message: "Updated page" });
}

export async function deletePage(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    await PageUtils.deletePageById(pageId);
    await deletePageCommentsById(pageId);
    res.status(200).json({ message: "Deleted page" });
}

export async function listPageComments(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const data = await listPageCommentsById(pageId);
    res.status(200).json({ message: "Listed all comments", data });
}
