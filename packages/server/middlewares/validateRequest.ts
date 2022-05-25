import { NextFunction, Request, Response } from "express";

import { authAdmin } from "../lib/firebaseAdmin";
import { reportBadRequest } from "../utils/extraUtils";

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 *
 * @param req The request sent
 * @param res The response
 * @param next Next function to be invoked
 * @returns True if the current user's uid is equal to the targeted document's uid.
 */
export default async function validateRequest(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === "development") {
        next();
        return;
    }
    if (!req.headers.authorization?.startsWith("Bearer ")) {
        res.status(403).json({ error: "Forbidden: unauthorized" });
        return;
    }
    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
        const decodedToken = await authAdmin.verifyIdToken(idToken);
        if (decodedToken.uid !== req.body.uid) {
            res.status(403).json({ error: "Forbidden: unauthorized" });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        reportBadRequest(res, error, "");
    }
}
