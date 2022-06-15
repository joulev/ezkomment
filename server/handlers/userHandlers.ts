import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";
import { NextApiRequest } from "next";

import * as userUtils from "~/server/utils/crud/userUtils";
import { deleteUserPhotoById } from "~/server/utils/crud/imageUtils";
import { deleteUserSitesById, listUserSitesById } from "~/server/utils/crud/siteUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { ApiResponse } from "~/types/server/nextApi.type";

export async function getUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    try {
        const data = await userUtils.getUserById(uid);
        res.status(200).json({ message: "Got user's data", data });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function updateUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const data: UpdateRequest = req.body;
    try {
        await userUtils.updateUserById(uid, data);
        res.status(200).json({ message: "Updated user" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function deleteUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    try {
        await deleteUserPhotoById(uid); // delete photo
        await deleteUserSitesById(uid); // delete ALL sites
        await userUtils.deleteUserById(uid);
        res.status(200).json({ message: "Deleted user" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

/////////////////////////
// Interact with sites //
/////////////////////////

export async function listUserSites(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    try {
        const data = await listUserSitesById(uid);
        res.status(200).json({ message: "Got user's sites", data });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

/////////////////////////////////
// For development and testing //
/////////////////////////////////

export async function createUser(req: NextApiRequest, res: ApiResponse) {
    const data: CreateRequest = req.body;
    try {
        await userUtils.createUser(data);
        res.status(201).json({ message: "Created new user" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}

export async function importUsers(req: NextApiRequest, res: ApiResponse) {
    const data: UserImportRecord[] = req.body;
    try {
        await userUtils.importUsers(data);
        res.status(201).json({ message: "Imported new users" });
    } catch (error) {
        reportBadRequest(res, error);
    }
}
