import { NextApiRequest } from "next";

import * as CommentUtils from "~/server/utils/commentUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import {
    CreateCommentBodyParams,
    CreateCommentPathParams,
    UpdateCommentBodyParams,
} from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function createComment(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req) as CreateCommentPathParams;
    const data: CreateCommentBodyParams = req.body;
    try {
        await CommentUtils.createComment({ pageId, ...data });
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

export async function updateComment(req: NextApiRequest, res: ApiResponse) {
    const { commentId } = extractFirstQueryValue(req);
    const data: UpdateCommentBodyParams = req.body;
    try {
        await CommentUtils.updateCommentById(commentId, data);
        res.status(200).json({ message: "Successfully updated comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update the comment in the targeted page");
    }
}

export async function deleteComment(req: NextApiRequest, res: ApiResponse) {
    const { commentId } = extractFirstQueryValue(req);
    try {
        await CommentUtils.deleteCommentById(commentId);
        res.status(200).json({ message: "Successfully deleted comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete the comment in the targeted page");
    }
}
