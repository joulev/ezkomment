import { verifyJWT, verifySessionCookie } from "~/server/utils/authUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ApiMiddleware } from "~/types/server/nextApi.type";

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 */
export const authenticateUidWithJWT: ApiMiddleware = async (req, res, next) => {
    const { uid } = extractFirstQueryValue(req);
    if (process.env.NODE_ENV === "development") {
        next();
        return;
    }
    const decodedClaim = await verifyJWT(req.headers.authorization);
    if (decodedClaim.uid === uid) {
        next();
    } else {
        res.status(403).json({ error: "Decoded uid does not match path uid" });
    }
};

/**
 * For some endpoints, decode the token is good enough.
 */
export const authenticateWithJWT: ApiMiddleware = async (req, _, next) => {
    if (process.env.NODE_ENV === "development") {
        next();
        return;
    }
    await verifyJWT(req.headers.authorization);
    next();
};

export const validateSessionCookie: ApiMiddleware = async (req, res, next) => {
    const sessionCookie = req.cookies.session;
    await verifySessionCookie(sessionCookie);
    next();
};
