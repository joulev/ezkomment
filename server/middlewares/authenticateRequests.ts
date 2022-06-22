import { verifyJWT, verifySessionCookie } from "~/server/utils/authUtils";
import CustomApiError from "~/server/utils/errors/customApiError";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ApiMiddleware, AuthenticatedApiRequest } from "~/types/server/nextApi.type";

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 */
export const authenticatePathUidWithJWT: ApiMiddleware = async (req, _, next) => {
    if (process.env.NODE_ENV === "development") {
        next();
        return;
    }
    const { uid } = extractFirstQueryValue(req);
    const decodedClaim = await verifyJWT(req.headers.authorization);
    if (decodedClaim.uid !== uid)
        throw new CustomApiError("Decoded uid does not match path uid", 403);
    next();
};

export const authenticateBodyUidWithJWT: ApiMiddleware = async (req, _, next) => {
    if (process.env.NODE_ENV === "development") {
        next();
        return;
    }
    const { uid } = req.body;
    const decodedClaim = await verifyJWT(req.headers.authorization);
    if (decodedClaim.uid !== uid) {
        throw new CustomApiError("Decoded uid does not match body uid", 403);
    }
    next();
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

export const attachUidWithJWT: ApiMiddleware<AuthenticatedApiRequest> = async (req, _, next) => {
    req.user = await verifyJWT(req.headers.authorization);
    next();
};
