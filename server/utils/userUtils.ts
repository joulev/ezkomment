import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";

import { authAdmin, firestoreAdmin } from "~/server/firebase/firebaseAdmin";

export async function getUserById(uid: string) {
    const user = await authAdmin.getUser(uid);
    return user.toJSON();
}

export async function deleteUserById(uid: string) {
    return await authAdmin.deleteUser(uid);
}

export async function updateUserById(uid: string, data: UpdateRequest) {
    return await authAdmin.updateUser(uid, data);
}

export async function createUser(data: CreateRequest) {
    return await authAdmin.createUser(data);
}

export async function importUsers(data: UserImportRecord[]) {
    return await authAdmin.importUsers(data);
}

const SITES_COLLECTION = firestoreAdmin.collection("sites");

export async function listUserSitesById(uid: string) {
    const sites = await SITES_COLLECTION.where("uid", "==", uid).get();
    return sites.docs.map(doc => doc.data());
}
