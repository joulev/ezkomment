import { PAGE } from "~/misc/validate";
import { removeUndefinedProperties, ApiMiddleware } from "~/server/next-connect";
import CustomApiError from "~/server/errors/custom-api-error";
import { CreatePageBody, RawBody, UpdatePageBody } from "~/types/server";

export const create: ApiMiddleware = (req, _, next) => {
    const { title, url, autoApprove, siteId }: RawBody<CreatePageBody> = req.body;
    if (typeof title !== "string" || !PAGE.titleIsValid(title))
        throw new CustomApiError("'title' must be a non-empty string");
    if (typeof url !== "string" || !PAGE.urlIsValid(url))
        throw new CustomApiError("'url' is invalid");
    if (typeof autoApprove !== "boolean")
        throw new CustomApiError("'autoApprove' must be a boolean");
    /**
     * Change later
     */
    if (typeof siteId !== "string" || !PAGE.siteIdIsValid(siteId))
        throw new CustomApiError("'siteId' must be a non-empty string");
    req.body = { title, url, autoApprove, siteId };
    next();
};

export const update: ApiMiddleware = (req, _, next) => {
    const { title, url, autoApprove }: RawBody<UpdatePageBody> = req.body;
    if (title !== undefined && (typeof title !== "string" || !PAGE.titleIsValid(title)))
        throw new CustomApiError("'title' must be a non-empty string");
    if (url !== undefined && (typeof url !== "string" || !PAGE.urlIsValid(url)))
        throw new CustomApiError("'url' is invalid");
    if (autoApprove !== undefined && typeof autoApprove !== "boolean")
        throw new CustomApiError("'autoApprove' must be a boolean");
    req.body = removeUndefinedProperties({ title, url, autoApprove });
    next();
};
