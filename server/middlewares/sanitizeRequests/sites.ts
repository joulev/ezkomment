import validator from "validator";

import CustomApiError from "~/server/utils/errors/customApiError";
import { removeUndefinedProperties } from "~/server/utils/nextHandlerUtils";

import { CreateSiteBodyParams, RawBody, UpdateSiteBodyParams } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

export const sanitizeCreateSiteRequest: ApiMiddleware = (req, _, next) => {
    const { name, domain, iconURL }: RawBody<CreateSiteBodyParams> = req.body;
    if (typeof name !== "string" || validator.isEmpty(name)) {
        throw new CustomApiError("'name' must be a non-empty string");
    }
    if (typeof domain !== "string" || !validator.isURL(domain)) {
        throw new CustomApiError("'domain' must be a valid URL");
    }
    if (iconURL !== null && (typeof iconURL !== "string" || !validator.isURL(iconURL))) {
        throw new CustomApiError("'iconURL' must be either a valid url or null");
    }
    req.body = { name, domain, iconURL: iconURL ?? null };
    next();
};

export const sanitizeUpdateSiteRequest: ApiMiddleware = (req, _, next) => {
    const { name, iconURL, domain }: RawBody<UpdateSiteBodyParams> = req.body;
    if (name !== undefined && (typeof name !== "string" || validator.isEmpty(name))) {
        throw new CustomApiError("'name' must be a non-empty string");
    }
    if (domain !== undefined && (typeof domain !== "string" || !validator.isURL(domain))) {
        throw new CustomApiError("'domain' must be a valid URL");
    }
    if (
        iconURL !== undefined &&
        iconURL !== null &&
        (typeof iconURL !== "string" || !validator.isURL(iconURL))
    ) {
        throw new CustomApiError("'iconURL' must be either a valid url or null");
    }
    req.body = removeUndefinedProperties({ name, iconURL, domain });
    next();
};
