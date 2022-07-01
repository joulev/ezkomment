import { Timestamp } from "firebase-admin/firestore";

import * as PageUtils from "~/server/utils/crud/pageUtils";
import { deletePageCommentsById, listPageCommentsById } from "~/server/utils/crud/commentUtils";
import { md2html } from "~/server/utils/embedUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ClientPage, CreatePageBodyParams, Page, UpdatePageBodyParams } from "~/types/server";
import { ApiResponse, AuthenticatedApiRequest } from "~/types/server/nextApi.type";

export async function getPage(req: AuthenticatedApiRequest, res: ApiResponse<ClientPage>) {
    const { uid } = req.user;
    const { pageId } = extractFirstQueryValue(req);
    const data = await PageUtils.getClientPageById(uid, pageId);
    res.status(200).json({ message: "Got page information", data });
}

export async function createPage(req: AuthenticatedApiRequest, res: ApiResponse<Page>) {
    const { uid } = req.user;
    const data: CreatePageBodyParams = req.body;
    const result = await PageUtils.createPage(uid, data);
    res.status(201).json({ message: "Created new page", data: result });
}

export async function updatePage(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { pageId } = extractFirstQueryValue(req);
    const data: UpdatePageBodyParams = req.body;
    await PageUtils.updatePageById(uid, pageId, data);
    res.status(200).json({ message: "Updated page" });
}

export async function deletePage(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { pageId } = extractFirstQueryValue(req);
    await PageUtils.deletePageById(uid, pageId);
    await deletePageCommentsById(pageId);
    res.status(200).json({ message: "Deleted page" });
}

export async function listPageComments(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const rawData = await listPageCommentsById(pageId);
    /**
     * This list of comments must be complied to html
     */
    const data = await Promise.all(
        rawData.map(async comment => {
            comment.text = await md2html(comment.text);
            return comment;
        })
    );
    res.status(200).json({ message: "Listed all comments", data });
}
