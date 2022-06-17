import { ApiMiddleware } from "~/types/server/nextApi.type";
import { UpdateUserBodyParams } from "~/types/server/user.type";

export const sanitizeUpdateUserRequest: ApiMiddleware = (req, _, next) => {
    const { displayName }: UpdateUserBodyParams = req.body;
    // Should I write rules to validate user's display name? Probably yes.
    req.body = { displayName };
    next();
};
