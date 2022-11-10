import { USER } from "~/misc/validate";

import CustomApiError from "~/old/server/utils/errors/customApiError";

import { RawBody } from "~/old/types/server";
import { ApiMiddleware } from "~/old/types/server/nextApi.type";
import { UpdateUserBodyParams } from "~/old/types/server/user.type";

export const sanitizeUpdateUserRequest: ApiMiddleware = (req, _, next) => {
    const { displayName }: RawBody<UpdateUserBodyParams> = req.body;
    if (typeof displayName !== "string" || !USER.displayNameIsValid(displayName)) {
        throw new CustomApiError("'displayName' must be a non-empty string");
    }
    req.body = { displayName };
    next();
};
