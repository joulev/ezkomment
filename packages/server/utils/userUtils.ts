import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";

import { authAdmin, firestoreAdmin } from "@server/lib/firebaseAdmin";

export async function getUserById(uid: string) {
    return await authAdmin.getUser(uid);
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
    return (await SITES_COLLECTION.where("uid", "==", uid).get()).docs;
}
