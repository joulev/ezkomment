import { NextApiRequest } from "next";

import * as CommentUtils from "~/server/utils/crud/commentUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import {
    CreateCommentBodyParams,
    CreateCommentPathParams,
    UpdateCommentBodyParams,
} from "~/types/server";
import { ApiResponse } from "~/types/server/nextApi.type";

export async function createComment(req: NextApiRequest, res: ApiResponse) {
    const { pageId } = extractFirstQueryValue(req) as CreateCommentPathParams;
    const data: CreateCommentBodyParams = req.body;
    const result = await CommentUtils.createComment({ pageId, ...data });
    res.status(201).json({ message: "Created new comment", data: result });
}

export async function updateComment(req: NextApiRequest, res: ApiResponse) {
    const { commentId } = extractFirstQueryValue(req);
    const data: UpdateCommentBodyParams = req.body;
    await CommentUtils.updateCommentById(commentId, data);
    res.status(200).json({ message: "Updated comment" });
}

export async function deleteComment(req: NextApiRequest, res: ApiResponse) {
    const { commentId } = extractFirstQueryValue(req);
    await CommentUtils.deleteCommentById(commentId);
    res.status(200).json({ message: "Deleted comment" });
}
