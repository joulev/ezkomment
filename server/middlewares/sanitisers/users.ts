import { USER } from "~/misc/validate";
import { ApiMiddleware } from "~/server/next-connect";
import CustomApiError from "~/server/errors/custom-api-error";
import { RawBody, UpdateUserBodyParams } from "~/types/server";

export const update: ApiMiddleware = (req, _, next) => {
    const { displayName }: RawBody<UpdateUserBodyParams> = req.body;
    if (typeof displayName !== "string" || !USER.displayNameIsValid(displayName))
        throw new CustomApiError("'displayName' must be a non-empty string");
    req.body = { displayName };
    next();
};
