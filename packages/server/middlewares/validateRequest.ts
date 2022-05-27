import { NextFunction, Request, Response } from "express";

import { validateJWT } from "@server/utils/authUtils";
import { reportBadRequest } from "@server/utils/extraUtils";

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 *
 * @returns True if the current user's uid is equal to the targeted document's uid.
 */
export async function validateRequest(req: Request, res: Response, next: NextFunction) {
    const uid = req.params.uid;
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
}
