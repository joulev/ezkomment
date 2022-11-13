import { SITE } from "~/misc/validate";
import { ApiMiddleware, removeUndefinedProperties } from "~/server/next-connect";
import CustomApiError from "~/server/errors/custom-api-error";
import {
    CreateSiteBodyParams,
    RawBody,
    UpdateSiteBodyParams,
    UpdateSiteTemplateBodyParams,
} from "~/types/server";

export const create: ApiMiddleware = (req, _, next) => {
    const { name, domain, iconURL }: RawBody<CreateSiteBodyParams> = req.body;
    if (typeof name !== "string" || !SITE.nameIsValid(name))
        throw new CustomApiError("'name' must be a valid URL slug");
    if (typeof domain !== "string" || !SITE.domainIsValid(domain))
        throw new CustomApiError("'domain' must be either a valid domain or '*'");
    if (iconURL !== null && (typeof iconURL !== "string" || !SITE.iconURLIsValid(iconURL)))
        throw new CustomApiError("'iconURL' must be either a valid url, undefined or null");
    req.body = { name, domain, iconURL: iconURL ?? null };
    next();
};

export const update: ApiMiddleware = (req, _, next) => {
    const { name, iconURL, domain }: RawBody<UpdateSiteBodyParams> = req.body;
    if (name !== undefined && (typeof name !== "string" || !SITE.nameIsValid(name)))
        throw new CustomApiError("'name' must be a non-empty string");
    if (domain !== undefined && (typeof domain !== "string" || !SITE.domainIsValid(domain)))
        throw new CustomApiError("'domain' must be a valid URL");
    if (
        iconURL !== undefined &&
        iconURL !== null &&
        (typeof iconURL !== "string" || !SITE.iconURLIsValid(iconURL))
    )
        throw new CustomApiError("'iconURL' must be either a valid url or null");
    req.body = removeUndefinedProperties({ name, iconURL, domain });
    next();
};

export const updateTemplate: ApiMiddleware = (req, _, next) => {
    const { template }: RawBody<UpdateSiteTemplateBodyParams> = req.body;
    if (typeof template !== "string")
        throw new CustomApiError("'template' must be a non-empty string");
    req.body = { template };
    next();
};
