import { PAGE } from "~/misc/validate";

import CustomApiError from "~/old/server/utils/errors/customApiError";
import { removeUndefinedProperties } from "~/old/server/utils/nextHandlerUtils";

import { CreatePageBodyParams, RawBody, UpdatePageBodyParams } from "~/old/types/server";
import { ApiMiddleware } from "~/old/types/server/nextApi.type";

export const sanitizeCreatePageRequest: ApiMiddleware = (req, _, next) => {
    const { title, url, autoApprove, siteId }: RawBody<CreatePageBodyParams> = req.body;
    if (typeof title !== "string" || !PAGE.titleIsValid(title)) {
        throw new CustomApiError("'title' must be a non-empty string");
    }
    if (typeof url !== "string" || !PAGE.urlIsValid(url)) {
        throw new CustomApiError("'url' is invalid");
    }
    if (typeof autoApprove !== "boolean") {
        throw new CustomApiError("'autoApprove' must be a boolean");
    }
    /**
     * Change later
     */
    if (typeof siteId !== "string" || !PAGE.siteIdIsValid(siteId)) {
        throw new CustomApiError("'siteId' must be a non-empty string");
    }
    req.body = { title, url, autoApprove, siteId };
    next();
};

export const sanitizeUpdatePageRequest: ApiMiddleware = (req, _, next) => {
    const { title, url, autoApprove }: RawBody<UpdatePageBodyParams> = req.body;
    if (title !== undefined && (typeof title !== "string" || !PAGE.titleIsValid(title))) {
        throw new CustomApiError("'title' must be a non-empty string");
    }
    if (url !== undefined && (typeof url !== "string" || !PAGE.urlIsValid(url))) {
        throw new CustomApiError("'url' is invalid");
    }
    if (autoApprove !== undefined && typeof autoApprove !== "boolean") {
        throw new CustomApiError("'autoApprove' must be a boolean");
    }
    req.body = removeUndefinedProperties({ title, url, autoApprove });
    next();
};
