import { CreateRequest, UpdateRequest, UserImportRecord } from "firebase-admin/auth";

import { authAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";

function handleError(err: unknown): never {
    if (err instanceof Error) {
        const code: string = (err as any).errorInfo?.code ?? "";
        console.log(code);
        if (code === "auth/user-not-found") throw new CustomApiError(err, 404);
        if (code.startsWith("auth/invalid")) throw new CustomApiError(err, 400);
    }
    throw err;
}

export async function getUserById(uid: string) {
    try {
        const user = await authAdmin.getUser(uid);
        return user.toJSON();
    } catch (err) {
        handleError(err);
    }
}

export async function updateUserById(uid: string, data: UpdateRequest) {
    try {
        const user = await authAdmin.updateUser(uid, data);
        return user.toJSON();
    } catch (err) {
        handleError(err);
    }
}

export async function deleteUserById(uid: string) {
    try {
        return await authAdmin.deleteUser(uid);
    } catch (err) {
        handleError(err);
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
