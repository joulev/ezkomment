import { Request, Response } from "express";
import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";

import * as userUtils from "@server/utils/userUtils";
import { reportBadRequest } from "@server/utils/extraUtils";

export async function getUser(req: Request, res: Response) {
    console.dir(req.query, { depth: null });
    const uid: string = req.params.uid;
    try {
        const result = await userUtils.getUserById(uid);
        res.status(200).json({
            message: "Successfully get user's data",
            data: result,
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get user");
    }
}

export async function updateUser(req: Request, res: Response) {
    const uid: string = req.params.uid;
    const data: UpdateRequest = req.body;
    try {
        await userUtils.updateUserById(uid, data);
        res.status(200).json({ message: "User was updated successfully" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update user");
    }
}

export async function deleteUser(req: Request, res: Response) {
    const uid: string = req.params.uid;
    try {
        await userUtils.deleteUserById(uid);
        res.status(200).json({ message: "User was deleted successfully" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete user");
    }
}

export async function listUserSites(req: Request, res: Response) {
    const uid: string = req.params.uid;
    try {
        const result = await userUtils.listUserSitesById(uid);
        res.status(200).json({
            message: "Successfully got all user's sites",
            data: result,
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot list user's sites");
    }
}

// For development and testing
export async function createUser(req: Request, res: Response) {
    const data: CreateRequest = req.body;
    try {
        await userUtils.createUser(data);
        res.status(201).json({ message: "New user was created!" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new user");
    }
}

export async function importUsers(req: Request, res: Response) {
    const data: UserImportRecord[] = req.body;
    try {
        await userUtils.importUsers(data);
        res.status(201).json({ message: "Imported new users" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot import users");
    }
}
