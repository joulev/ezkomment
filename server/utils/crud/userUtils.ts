import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";

import { authAdmin } from "~/server/firebase/firebaseAdmin";
import { handleUserError } from "~/server/utils/errors/handleAuthError";

export async function getUserById(uid: string) {
    try {
        const user = await authAdmin.getUser(uid);
        return user.toJSON();
    } catch (err) {
        handleUserError(err);
    }
}

export async function updateUserById(uid: string, data: UpdateRequest) {
    try {
        const user = await authAdmin.updateUser(uid, data);
        return user.toJSON();
    } catch (err) {
        handleUserError(err);
    }
}

export async function deleteUserById(uid: string) {
    try {
        return await authAdmin.deleteUser(uid);
    } catch (err) {
        handleUserError(err);
    }
}

//////////////////////////
// For development only //
//////////////////////////

export async function createUser(data: CreateRequest) {
    return await authAdmin.createUser(data);
}

export async function importUsers(data: UserImportRecord[]) {
    return await authAdmin.importUsers(data);
}
