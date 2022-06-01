// TODO: Fix sites and pages data models
import { Request, Response } from "express";

import * as PageUtils from "@server/utils/pageUtils";
import {
    CreateCommentRequest,
    CreatePageRequest,
    UpdateCommentRequest,
    UpdatePageRequest,
} from "@server/models";
import { reportBadRequest } from "@server/utils/extraUtils";

///////////
// PAGES //
///////////

export async function getPage(req: Request, res: Response) {
    const pageId: string = req.params.pageId;
    try {
        res.status(200).json({
            message: "Successfully got page information",
            data: await PageUtils.getPageById(pageId),
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get page's information");
    }
}

export async function createPage(req: Request, res: Response) {
    try {
        const data: CreatePageRequest = req.body;
        await PageUtils.createPage(data);
        res.status(201).json({ message: "Successfully created new page" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new page");
    }
}

export async function updatePage(req: Request, res: Response) {
    const pageId: string = req.params.pageId;
    try {
        const data: UpdatePageRequest = req.body;
        await PageUtils.updatePageById(pageId, data);
        res.status(200).json({ message: "Successfully updated page" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update page");
    }
}

export async function deletePage(req: Request, res: Response) {
    const pageId: string = req.params.pageId;
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

export async function createPageComment(req: Request, res: Response) {
    const pageId: string = req.params.pageId;
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

export async function updatePageComment(req: Request, res: Response) {
    const { pageId, commentId } = req.params;
    try {
        const data: UpdateCommentRequest = req.body;
        await PageUtils.updatePageComment(pageId, commentId, data);
        res.status(200).json({ message: "Successfully updated comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update the comment in the targeted page");
    }
}

export async function deletePageComment(req: Request, res: Response) {
    const { pageId, commentId } = req.params;
    try {
        await PageUtils.deletePageComment(pageId, commentId);
        res.status(200).json({ message: "Successfully deleted comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete the comment in the targeted page");
    }
}
