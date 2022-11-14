import { COMMENT } from "~/misc/validate";
import CustomApiError from "~/server/errors/custom-api-error";
import { ApiMiddleware } from "~/server/next-connect";
import { CreateCommentBody, RawBody, UpdateCommentBody } from "~/types/server";

function isApprovedStatus(status: string) {
    return status === "Approved";
}

export const create: ApiMiddleware = (req, _, next) => {
    const { author, text, pageId }: RawBody<CreateCommentBody> = req.body;
    if (typeof text !== "string" || !COMMENT.textIsValid(text))
        throw new CustomApiError("'text' must not be a non-empty string");
    if (author !== undefined && author !== null && typeof author !== "string")
        throw new CustomApiError(
            "'author' must be a string, undefined or null. If falsy, 'author' will be casted to null."
        );
    // Subject to change
    if (typeof pageId !== "string" || !COMMENT.pageIdIsValid(pageId))
        throw new CustomApiError("'pageId' must be a non-empty string");
    req.body = { author: author || null, text, pageId };
    next();
};

export const update: ApiMiddleware = (req, _, next) => {
    const { status }: RawBody<UpdateCommentBody> = req.body;
    if (typeof status !== "string" || !isApprovedStatus(status))
        throw new CustomApiError("'status' must be 'Approved'");
    req.body = { status };
    next();
};
