// TODO: Fix sites and pages data models
import { NextApiRequest, NextApiResponse } from "next";

import * as PageUtils from "~/server/utils/pageUtils";
import {
    CreateCommentRequest,
    CreatePageRequest,
    UpdateCommentRequest,
    UpdatePageRequest,
} from "~/server/types";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

///////////
// PAGES //
///////////

export async function getPage(req: NextApiRequest, res: NextApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        res.status(200).json({
            message: "Successfully got page information",
            data: await PageUtils.getPageById(pageId),
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get page's information");
    }
}

export async function createPage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data: CreatePageRequest = req.body;
        await PageUtils.createPage(data);
        res.status(201).json({ message: "Successfully created new page" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new page");
    }
}

export async function updatePage(req: NextApiRequest, res: NextApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        const data: UpdatePageRequest = req.body;
        await PageUtils.updatePageById(pageId, data);
        res.status(200).json({ message: "Successfully updated page" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update page");
    }
}

export async function deletePage(req: NextApiRequest, res: NextApiResponse) {
    const { pageId } = extractFirstQueryValue(req);
    try {
        await PageUtils.deletePageById(pageId);
        res.status(200).json({ message: "Successfully deleted page and its content" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete page and its content");
    }
}

//////////////
// COMMENTS //
//////////////

export async function createPageComment(req: NextApiRequest, res: NextApiResponse) {
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

export async function updatePageComment(req: NextApiRequest, res: NextApiResponse) {
    const { pageId, commentId } = extractFirstQueryValue(req);
    try {
        const data: UpdateCommentRequest = req.body;
        await PageUtils.updatePageCommentById(pageId, commentId, data);
        res.status(200).json({ message: "Successfully updated comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update the comment in the targeted page");
    }
}

export async function deletePageComment(req: NextApiRequest, res: NextApiResponse) {
    const { pageId, commentId } = extractFirstQueryValue(req);
    try {
        await PageUtils.deletePageCommentById(pageId, commentId);
        res.status(200).json({ message: "Successfully deleted comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete the comment in the targeted page");
    }
}
