import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";
import { NextApiRequest } from "next";

import * as userUtils from "~/server/utils/userUtils";
import { deleteUserPhotoById } from "~/server/utils/imageUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";
import { deleteUserSitesById, listUserSitesById } from "~/server/utils/siteUtils";

import { ApiResponse } from "~/types/server/nextApi.type";

export async function getUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
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

export async function updateUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const data: UpdateRequest = req.body;
    try {
        await userUtils.updateUserById(uid, data);
        res.status(200).json({ message: "User was updated successfully" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update user");
    }
}

export async function deleteUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    try {
        await userUtils.deleteUserById(uid);
        await deleteUserPhotoById(uid);
        await deleteUserSitesById(uid);
        res.status(200).json({ message: "User was deleted successfully" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete user");
    }
}

/////////////////////////
// Interact with sites //
/////////////////////////

export async function listUserSites(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    try {
        const result = await listUserSitesById(uid);
        res.status(200).json({
            message: "Successfully got all user's sites",
            data: result,
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot list user's sites");
    }
}

/////////////////////////////////
// For development and testing //
/////////////////////////////////

export async function createUser(req: NextApiRequest, res: ApiResponse) {
    const data: CreateRequest = req.body;
    try {
        await userUtils.createUser(data);
        res.status(201).json({ message: "New user was created!" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new user");
    }
}

export async function importUsers(req: NextApiRequest, res: ApiResponse) {
    const data: UserImportRecord[] = req.body;
    try {
        await userUtils.importUsers(data);
        res.status(201).json({ message: "Imported new users" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot import users");
    }
}
