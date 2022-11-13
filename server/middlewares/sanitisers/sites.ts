import { ApiMiddleware } from "~/server/next-connect";
import CustomApiError from "~/server/errors/custom-api-error";
import { RawBody, UpdateSiteTemplateBodyParams } from "~/types/server";

export const updateTemplate: ApiMiddleware = (req, _, next) => {
    const { template }: RawBody<UpdateSiteTemplateBodyParams> = req.body;
    if (typeof template !== "string")
        throw new CustomApiError("'template' must be a non-empty string");
    req.body = { template };
    next();
};
