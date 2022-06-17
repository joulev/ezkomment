import validator from "validator";

import CustomApiError from "~/server/utils/errors/customApiError";

import { ApiMiddleware } from "~/types/server/nextApi.type";
import { UpdateUserBodyParams } from "~/types/server/user.type";

export const sanitizeUpdateUserRequest: ApiMiddleware = (req, _, next) => {
    const { displayName }: UpdateUserBodyParams = req.body;
    if (typeof displayName !== "string" || validator.isEmpty(displayName)) {
        throw new CustomApiError("'displayName' must be a non-empty string");
    }
    req.body = { displayName };
    next();
};
