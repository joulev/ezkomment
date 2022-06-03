import { INextApiMiddleware } from "@server/models/nextApi.type";
import { validateJWT } from "@server/utils/authUtils";
import { extractFirstQueryValue, reportBadRequest } from "@server/utils/extraUtils";

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 *
 * @returns True if the current user's uid is equal to the targeted document's uid.
 */
export const validateRequest: INextApiMiddleware = async (req, res, next) => {
    const { uid } = extractFirstQueryValue(req);
    try {
        if (await validateJWT(uid, req.headers.authorization)) {
            next();
        } else {
            res.status(403).json({ error: "Forbidden: unauthorized" });
        }
    } catch (error) {
        console.error(error);
        reportBadRequest(res, error, "");
    }
};
