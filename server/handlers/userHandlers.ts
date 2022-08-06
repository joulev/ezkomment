import { UpdateRequest } from "firebase-admin/auth";

import * as UserUtils from "~/server/utils/crud/userUtils";
import { deleteUserPhoto } from "~/server/utils/crud/imageUtils";
import { deleteUserNotifications } from "~/server/utils/crud/notificationUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ApiRequest, ApiResponse } from "~/types/server/nextApi.type";

export async function getUser(req: ApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const user = await UserUtils.getUserById(uid);
    /**
     * Get all information about site here.
     */
    const sites = await UserUtils.listUserSites(uid);
    res.status(200).json({ message: "Got user's data", data: { ...user, sites } });
}

export async function updateUser(req: ApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const data: UpdateRequest = req.body;
    await UserUtils.updateUserById(uid, data);
    res.status(200).json({ message: "Updated user" });
}

export async function deleteUser(req: ApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    await UserUtils.deleteUserById(uid);
    // If the user exists, then
    await Promise.all([
        deleteUserPhoto(uid), // delete photo
        deleteUserNotifications(uid),
        UserUtils.deleteUserSites(uid), // delete ALL sites
    ]);
    res.status(200).json({ message: "Deleted user" });
}

///////////
// SITES //
///////////

export async function listUserSites(req: ApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const data = await UserUtils.listUserSites(uid);
    res.status(200).json({ message: "Got user's sites", data });
}

///////////
// EXTRA //
///////////

export async function verifyUserEmail(req: ApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    await UserUtils.updateUserById(uid, { emailVerified: true });
    res.status(200).json({ message: "Verified user's email" });
}

export async function initializeUser(req: ApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    await UserUtils.initializeUserById(uid);
    res.status(200).json({ message: "Initialized user" });
}
