import { verifyJWT, verifySessionCookie } from "~/server/utils/authUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { ApiMiddleware } from "~/types/server/nextApi.type";

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 *
 * @returns True if the current user's uid is equal to the targeted document's uid.
 */
export const validateUidWithJWT: ApiMiddleware = async (req, res, next) => {
    const { uid } = extractFirstQueryValue(req);
    if (process.env.NODE_ENV === "development") {
        next();
        return;
    }
    try {
        const decodedClaim = await verifyJWT(req.headers.authorization);
        if (decodedClaim.uid === uid) {
            next();
        } else {
            res.status(403).json({ error: "Decoded uid does not match path uid" });
        }
    } catch (error) {
        reportBadRequest(res, error);
    }
};

export const validateSessionCookie: ApiMiddleware = async (req, res, next) => {
    const sessionCookie = req.cookies.session;
    try {
        const decodedClaim = await verifySessionCookie(sessionCookie);
        // Just need a session cookie at the momment, more logic will be added later.
        next();
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot access resources");
    }
};
