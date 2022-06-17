import validator from "validator";

import CustomApiError from "~/server/utils/errors/customApiError";
import { removeUndefinedProperties } from "~/server/utils/nextHandlerUtils";

import { CreatePageBodyParams, RawBody, UpdatePageBodyParams } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

export const sanitizeCreatePageRequest: ApiMiddleware = (req, _, next) => {
    const { name, url, autoApprove }: RawBody<CreatePageBodyParams> = req.body;
    if (typeof name !== "string" || validator.isEmpty(name)) {
        throw new CustomApiError("'name' must be a non-empty string");
    }
    if (typeof url !== "string" || !validator.isURL(url)) {
        throw new CustomApiError("'url' is invalid");
    }
    if (typeof autoApprove !== "boolean") {
        throw new CustomApiError("'autoApprove' must be a boolean");
    }
    req.body = { name, url, autoApprove };
    next();
};

export const sanitizeUpdatePageRequest: ApiMiddleware = (req, _, next) => {
    const { name, url, autoApprove }: RawBody<UpdatePageBodyParams> = req.body;
    if (name !== undefined && (typeof name !== "string" || validator.isEmpty(name))) {
        throw new CustomApiError("'name' must be a non-empty string");
    }
    if (url !== undefined && (typeof url !== "string" || !validator.isURL(url))) {
        throw new CustomApiError("'url' is invalid");
    }
    if (autoApprove !== undefined && typeof autoApprove !== "boolean") {
        throw new CustomApiError("'autoApprove' must be a boolean");
    }
    req.body = removeUndefinedProperties({ name, url, autoApprove });
    next();
};