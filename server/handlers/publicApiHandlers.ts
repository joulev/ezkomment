import * as PublicApiUtils from "~/server/utils/crud/publicApiUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { Comment, PublicCreateCommentBodyParams } from "~/types/server";
import { ApiRequest, ApiResponse } from "~/types/server/nextApi.type";

export async function publicListPageApprovedComments(req: ApiRequest, res: ApiResponse<Comment[]>) {
    const { siteId, pageId } = extractFirstQueryValue(req);
    const data = await PublicApiUtils.publicListPageApprovedComments(siteId, pageId);
    res.status(200).json({ message: "Listed approved comments", data });
}

export async function publicCreateComment(req: ApiRequest, res: ApiResponse<Comment>) {
    const { siteId, pageId } = extractFirstQueryValue(req);
    const data: PublicCreateCommentBodyParams = req.body;
    const result = await PublicApiUtils.publicCreateComment(siteId, pageId, data);
    res.status(200).json({ message: "Created new comment", data: result });
}
