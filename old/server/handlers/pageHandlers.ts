import * as PageUtils from "~/old/server/utils/crud/pageUtils";
import { compileComments2html } from "~/old/server/utils/embedUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { ClientPage, CreatePageBodyParams, Page, UpdatePageBodyParams } from "~/old/types/server";
import { ApiRequest, ApiResponse, AuthenticatedApiRequest } from "~/old/types/server/nextApi.type";

export async function getPage(req: AuthenticatedApiRequest, res: ApiResponse<ClientPage>) {
    const { uid } = req.user;
    const { pageId } = extractFirstQueryValue(req);
    const { comments: rawComments, ...rest } = await PageUtils.getClientPageWithUid(uid, pageId);
    const comments = await compileComments2html(rawComments);
    res.status(200).json({ message: "Got page information", data: { comments, ...rest } });
}

export async function createPage(req: AuthenticatedApiRequest, res: ApiResponse<Page>) {
    const { uid } = req.user;
    const data: CreatePageBodyParams = req.body;
    const result = await PageUtils.createPageWithUid(uid, data);
    res.status(201).json({ message: "Created new page", data: result });
}

export async function updatePage(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { pageId } = extractFirstQueryValue(req);
    const data: UpdatePageBodyParams = req.body;
    await PageUtils.updatePageWithUid(uid, pageId, data);
    res.status(200).json({ message: "Updated page" });
}

export async function deletePage(req: AuthenticatedApiRequest, res: ApiResponse) {
    const { uid } = req.user;
    const { pageId } = extractFirstQueryValue(req);
    await PageUtils.deletePageWithUid(uid, pageId);
    await PageUtils.deletePageComments(pageId);
    res.status(200).json({ message: "Deleted page" });
}

// export async function listPageComments(req: ApiRequest, res: ApiResponse) {
//     const { pageId } = extractFirstQueryValue(req);
//     const data = await listPageCommentsById(pageId).then(compileComments2html);
//     res.status(200).json({ message: "Listed all comments", data });
// }

export async function listPageApprovedComments(req: ApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const data = await PageUtils.listPageApprovedComments(pageId).then(compileComments2html);
    res.status(200).json({ message: "Listed all approved comments", data });
}

export async function listPageApprovedCommentsRaw(req: ApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    const data = await PageUtils.listPageApprovedComments(pageId);
    res.status(200).json({ message: "Listed all approved comments", data });
}
