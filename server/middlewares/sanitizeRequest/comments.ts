import CustomApiError from "~/server/utils/errors/customApiError";

import { RawBody } from "~/types/server";
import { CreateCommentBodyParams, UpdateCommentBodyParams } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

function isApprovedStatus(status: string) {
    return status === "Approved" || status === "Pending";
}

export const sanitizeCreateCommentRequest: ApiMiddleware = (req, _, next) => {
    let { author, text }: RawBody<CreateCommentBodyParams> = req.body;
    if (!text) {
        throw new CustomApiError("'text' must not be empty");
    }
    req.body = { author: author ?? null, text };
    next();
};

export const sanitizeUpdateCommentRequest: ApiMiddleware = (req, _, next) => {
    let { status }: RawBody<UpdateCommentBodyParams> = req.body;
    if (!status || !isApprovedStatus(status)) {
        throw new CustomApiError("'status' must be either 'Approved' or 'Pending'");
    }
    req.body = { status };
    next();
};
