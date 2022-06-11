import { NextApiRequest } from "next";

import * as PageUtils from "~/server/utils/pageUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import {
    CreateCommentRequest,
    CreatePageBodyParams,
    CreatePagePathParams,
    UpdateCommentRequest,
    UpdatePageBodyParams,
} from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

///////////
// PAGES //
///////////

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
        // delete associate comments as well.
        res.status(200).json({ message: "Successfully deleted page and its content" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete page and its content");
    }
}

// BELOW FUNCTIONS WILL BE MODIFIED

//////////////
// COMMENTS //
//////////////

export async function createPageComment(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    // May update in the future, using page's url.
    try {
        const data: CreateCommentRequest = req.body;
        await PageUtils.createPageComment(pageId, data);
        res.status(201).json({
            message: "Successfully created new comment",
        });
    } catch (error) {
        reportBadRequest(
            res,
            error,
            "Bad request: cannot create a new comment in the targeted page"
        );
    }
}

export async function updatePageComment(req: NextApiRequest, res: ApiResponse) {
    const { pageId, commentId } = extractFirstQueryValue(req);
    try {
        const data: UpdateCommentRequest = req.body;
        await PageUtils.updatePageCommentById(pageId, commentId, data);
        res.status(200).json({ message: "Successfully updated comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update the comment in the targeted page");
    }
}

export async function deletePageComment(req: NextApiRequest, res: ApiResponse) {
    const { pageId, commentId } = extractFirstQueryValue(req);
    try {
        await PageUtils.deletePageCommentById(pageId, commentId);
        res.status(200).json({ message: "Successfully deleted comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete the comment in the targeted page");
    }
}
