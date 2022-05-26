import { Request, Response } from "express";
import { UserRecord } from "firebase-admin/auth";

import { authAdmin } from "../lib/firebaseAdmin";
import { reportBadRequest } from "./extraUtils";

export const getUser = async (req: Request, res: Response) => {
    console.dir(req.body, { depth: null });
    try {
        const result: UserRecord = await authAdmin.getUser(req.body.uid);
        res.status(200).json({
            message: "Successfully get user's data",
            data: result.toJSON(),
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get user");
    }
};

export async function updateUser(req: Request, res: Response) {
    try {
        const { uid, displayName, photoURL } = req.body;
        const data: { [k: string]: any } = {};
        if (displayName) {
            data.displayName = displayName;
        }
        if (photoURL) {
            data.photoURL = photoURL;
        }
        await authAdmin.updateUser(uid, data);
        res.status(200).json({ message: "User was updated successfully" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update user");
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const uid = req.body.uid;
        await authAdmin.deleteUser(uid);
        res.status(200).json({ message: "User was deleted successfully" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete user");
    }
}

// For development and testing
export async function createUser(req: Request, res: Response) {
    console.dir(req.body, { depth: null });
    try {
        const { uid, email, displayName, photoURL } = req.body;
        await authAdmin.createUser({
            uid,
            email,
            displayName,
            photoURL,
        });
        res.status(201).json({ message: "New user was created!" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new user");
    }
}

export async function importUsers(req: Request, res: Response) {
    try {
        // need to store all users info in an array, which is not the best design
        const userInfo = req.body.users;
        await authAdmin.importUsers(userInfo);
        res.status(201).json({ message: "Imported new users" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot import users");
    }
}
