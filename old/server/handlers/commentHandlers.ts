import * as CommentUtils from "~/old/server/utils/crud/commentUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { CreateCommentBodyParams, UpdateCommentBodyParams } from "~/old/types/server";
import { ApiRequest, ApiResponse } from "~/old/types/server/nextApi.type";

export async function createComment(req: ApiRequest, res: ApiResponse) {
    const data: CreateCommentBodyParams = req.body;
    const result = await CommentUtils.createComment(data);
    res.status(201).json({ message: "Created new comment", data: result });
}

export async function updateComment(req: ApiRequest, res: ApiResponse) {
    const { commentId } = extractFirstQueryValue(req);
    const data: UpdateCommentBodyParams = req.body;
    await CommentUtils.updateComment(commentId, data);
    res.status(200).json({ message: "Updated comment" });
}

export async function deleteComment(req: ApiRequest, res: ApiResponse) {
    const { commentId } = extractFirstQueryValue(req);
    await CommentUtils.deleteComment(commentId);
    res.status(200).json({ message: "Deleted comment" });
}
