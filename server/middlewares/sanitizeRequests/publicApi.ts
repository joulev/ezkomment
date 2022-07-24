import { COMMENT } from "~/misc/validate";

import CustomApiError from "~/server/utils/errors/customApiError";

import { PublicCreateCommentBodyParams, RawBody } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

export const sanitizePublicCreateCommentRequest: ApiMiddleware = (req, _, next) => {
    const { author, text }: RawBody<PublicCreateCommentBodyParams> = req.body;
    if (typeof text !== "string" || !COMMENT.textIsValid(text)) {
        throw new CustomApiError("'text' must not be a non-empty string");
    }
    if (author !== undefined && author !== null && typeof author !== "string") {
        throw new CustomApiError(
            "'author' must be a string, undefined or null. If falsy, 'author' will be casted to null."
        );
    }
    req.body = { author: author || null, text };
    next();
};
