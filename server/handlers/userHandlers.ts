import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";
import { NextApiRequest } from "next";

import * as userUtils from "~/server/utils/crud/userUtils";
import { deleteUserPhotoById } from "~/server/utils/crud/imageUtils";
import { deleteUserSitesById, listUserSitesById } from "~/server/utils/crud/siteUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ApiResponse } from "~/types/server/nextApi.type";

export async function getUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const data = await userUtils.getUserById(uid);
    res.status(200).json({ message: "Got user's data", data });
}

export async function updateUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const data: UpdateRequest = req.body;
    await userUtils.updateUserById(uid, data);
    res.status(200).json({ message: "Updated user" });
}

export async function deleteUser(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    await userUtils.deleteUserById(uid);
    // If the user exists, then
    await Promise.all([
        deleteUserPhotoById(uid), // delete photo
        deleteUserSitesById(uid), // delete ALL sites
    ]);
    res.status(200).json({ message: "Deleted user" });
}

/////////////////////////
// Interact with sites //
/////////////////////////

export async function listUserSites(req: NextApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const data = await listUserSitesById(uid);
    res.status(200).json({ message: "Got user's sites", data });
}

/////////////////////////////////
// For development and testing //
/////////////////////////////////

export async function createUser(req: NextApiRequest, res: ApiResponse) {
    const data: CreateRequest = req.body;
    await userUtils.createUser(data);
    res.status(201).json({ message: "Created new user" });
}

export async function importUsers(req: NextApiRequest, res: ApiResponse) {
    const data: UserImportRecord[] = req.body;
    await userUtils.importUsers(data);
    res.status(201).json({ message: "Imported new users" });
}
