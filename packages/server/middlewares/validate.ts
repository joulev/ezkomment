import { NextFunction } from "express";

import { authAdmin } from "../lib/firebaseAdmin";
import { IRequest, IResponse } from "../models/expressTypes";

export async function decodeIDToken(req: IRequest, res: IResponse, next: NextFunction) {
    if (req.headers?.authorization?.startsWith("Bearer ")) {
        const idToken = req.headers.authorization.split("Bearer ")[1];
        try {
            const decodedToken = await authAdmin.verifyIdToken(idToken);
            req.currentUser = decodedToken;
        } catch (error) {
            console.error(error);
        }
    }
    next();
}

/**
 * Middleware that checks whether the current user's uid and the targeted document's uid match.
 *
 * @param req The request sent
 * @param res The response
 * @param next Next function to be invoked
 * @returns True if the current user's uid is equal to the targeted document's uid.
 */
export function validateRequest(req: IRequest, res: IResponse, next: NextFunction) {
    if (process.env.NODE_ENV === "development") {
        next();
        return;
    }
    const currentUserUid = req.currentUser?.uid;
    if (!currentUserUid || currentUserUid !== req.body.uid) {
        res.status(403).json({ error: "Forbidden: unauthorized" });
    } else {
        next();
    }
}
