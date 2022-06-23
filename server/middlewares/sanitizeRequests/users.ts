import { USER } from "~/misc/validate";

import CustomApiError from "~/server/utils/errors/customApiError";

import { RawBody } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";
import { UpdateUserBodyParams } from "~/types/server/user.type";

export const sanitizeUpdateUserRequest: ApiMiddleware = (req, _, next) => {
    const { displayName }: RawBody<UpdateUserBodyParams> = req.body;
    if (typeof displayName !== "string" || !USER.displayNameIsValid(displayName)) {
        throw new CustomApiError("'displayName' must be a non-empty string");
    }
    req.body = { displayName };
    next();
};
