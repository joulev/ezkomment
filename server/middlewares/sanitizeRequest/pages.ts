import validator from "validator";

import CustomApiError from "~/server/utils/errors/customApiError";
import { removeUndefinedProperties } from "~/server/utils/nextHandlerUtils";

import { CreatePageBodyParams, RawBody, UpdatePageBodyParams } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

export const sanitizeCreatePageRequest: ApiMiddleware = (req, _, next) => {
    const { name, url, autoApprove }: RawBody<CreatePageBodyParams> = req.body;
    if (!name) {
        throw new CustomApiError("'name' must not be empty");
    }
    if (!url || !validator.isURL(url)) {
        throw new CustomApiError("'url' is invalid");
    }
    if (!autoApprove || !validator.isBoolean(autoApprove)) {
        throw new CustomApiError("'autoApprove' must be a boolean");
    }
    req.body = { name, url, autoApprove: autoApprove === "true" };
    next();
};

export const sanitizeUpdatePageRequest: ApiMiddleware = (req, _, next) => {
    const { name, url, autoApprove }: RawBody<UpdatePageBodyParams> = req.body;
    if (name !== undefined && validator.isEmpty(name)) {
        throw new CustomApiError("'name' must not be empty");
    }
    if (url && !validator.isURL(url)) {
        throw new CustomApiError("'url' is invalid");
    }
    if (autoApprove && !validator.isBoolean(autoApprove)) {
        throw new CustomApiError("'autoApprove' must be a boolean");
    }
    req.body = removeUndefinedProperties({
        name,
        url,
        autoApprove: autoApprove === undefined ? undefined : autoApprove === "true",
    });
    next();
};
