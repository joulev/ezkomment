import { COMMENT } from "~/misc/validate";

import CustomApiError from "~/server/utils/errors/customApiError";

import { CreateCommentBodyParams, RawBody, UpdateCommentBodyParams } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

function isApprovedStatus(status: string) {
    return status === "Approved";
}

export const sanitizeCreateCommentRequest: ApiMiddleware = (req, _, next) => {
    const { author, text, pageId }: RawBody<CreateCommentBodyParams> = req.body;
    if (typeof text !== "string" || !COMMENT.textIsValid(text)) {
        throw new CustomApiError("'text' must not be a non-empty string");
    }
    if (author !== undefined && author !== null && typeof author !== "string") {
        throw new CustomApiError(
            "'author' must be a non-empty string, undefined or null. If undefined, 'author' will be casted to null."
        );
    }
    // Subject to change
    if (typeof pageId !== "string" || !COMMENT.pageIdIsValid(pageId)) {
        throw new CustomApiError("'pageId' must be a non-empty string");
    }
    req.body = { author: author || null, text, pageId };
    next();
};

export const sanitizeUpdateCommentRequest: ApiMiddleware = (req, _, next) => {
    let { status }: RawBody<UpdateCommentBodyParams> = req.body;
    if (typeof status !== "string" || !isApprovedStatus(status)) {
        throw new CustomApiError("'status' must be 'Approved'");
    }
    req.body = { status };
    next();
};
