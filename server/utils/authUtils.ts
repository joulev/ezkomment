import { SessionCookieOptions } from "firebase-admin/auth";

import { authAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleVerifyError } from "~/server/utils/errors/handleAuthError";

/**
 * Checks whether the current user is authorized using JWT.
 *
 * @param jwt The JWT sent together with the requests
 * @returns Whether the current user's uid is equal to the targeted document's uid.
 */
export async function verifyJWT(jwt?: string) {
    if (!jwt?.startsWith("Bearer ")) {
        throw new CustomApiError("JWT token must start with 'Bearer '", 403);
    }
    const idToken = jwt.split("Bearer ")[1];
    return await authAdmin.verifyIdToken(idToken, true).catch(handleVerifyError);
}
