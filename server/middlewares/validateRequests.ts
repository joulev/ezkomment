import { verifyJWT, verifySessionCookie } from "~/server/utils/authUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { INextApiMiddleware } from "~/types/server/nextApi.type";

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 *
 * @returns True if the current user's uid is equal to the targeted document's uid.
 */
export const validateUidWithJWT: INextApiMiddleware = async (req, res, next) => {
    const { uid } = extractFirstQueryValue(req);
    try {
        const decodedClaim = await verifyJWT(req.headers.authorization);
        if (decodedClaim.uid === uid) {
            next();
        } else {
            throw Error("Unauthorized");
        }
    } catch (error) {
        console.error(error);
        reportBadRequest(res, error, "Bad request: cannot access resources");
    }
};

export const validateSessionCookie: INextApiMiddleware = async (req, res, next) => {
    const sessionCookie = req.cookies.session;
    try {
        const decodedClaim = await verifySessionCookie(sessionCookie);
        // Just need a session cookie at the momment, more logic will be added later.
        next();
    } catch (error) {
        console.error(error);
        reportBadRequest(res, error, "Bad request: cannot access resources");
    }
};
