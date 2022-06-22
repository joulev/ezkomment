import validator from "validator";

import CustomApiError from "~/server/utils/errors/customApiError";
import { removeUndefinedProperties } from "~/server/utils/nextHandlerUtils";

import { CreatePageBodyParams, RawBody, UpdatePageBodyParams } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

export const sanitizeCreatePageRequest: ApiMiddleware = (req, _, next) => {
    const { title, url, autoApprove, siteId }: RawBody<CreatePageBodyParams> = req.body;
    if (typeof title !== "string" || validator.isEmpty(title)) {
        throw new CustomApiError("'title' must be a non-empty string");
    }
    if (typeof url !== "string" || !validator.isURL(url)) {
        throw new CustomApiError("'url' is invalid");
    }
    if (typeof autoApprove !== "boolean") {
        throw new CustomApiError("'autoApprove' must be a boolean");
    }
    /**
     * Change later
     */
    if (typeof siteId !== "string" || validator.isEmpty(siteId)) {
        throw new CustomApiError("'siteId' must be a non-empty string");
    }
    req.body = { name, url, autoApprove, siteId };
    next();
};

export const sanitizeUpdatePageRequest: ApiMiddleware = (req, _, next) => {
    const { title, url, autoApprove }: RawBody<UpdatePageBodyParams> = req.body;
    if (title !== undefined && (typeof title !== "string" || validator.isEmpty(title))) {
        throw new CustomApiError("'title' must be a non-empty string");
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
