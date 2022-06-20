import { UpdateRequest } from "firebase-admin/auth";

import { authAdmin } from "~/server/firebase/firebaseAdmin";
import { handleUserError } from "~/server/utils/errors/handleAuthError";

export async function getUserById(uid: string) {
    try {
        const user = await authAdmin.getUser(uid);
        return user;
    } catch (err) {
        handleUserError(err);
    }
}

export async function updateUserById(uid: string, data: UpdateRequest) {
    try {
        const user = await authAdmin.updateUser(uid, data);
        return user;
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
