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
    try {
        const idToken = jwt.split("Bearer ")[1];
        return await authAdmin.verifyIdToken(idToken, true);
    } catch (err) {
        handleVerifyError(err);
    }
}

export async function verifySessionCookie(cookie?: string) {
    if (!cookie) {
        throw new CustomApiError("No session cookie", 403);
    }
    try {
        return await authAdmin.verifySessionCookie(cookie, true);
    } catch (err) {
        handleVerifyError(err);
    }
}

/**
 * Creates a session cookie.
 *
 * @param idToken The id token sent together with the requests
 * @returns The session cookie
 */
export async function createSessionCookie(idToken?: string) {
    if (!idToken) {
        throw new CustomApiError("No id token token", 400);
    }
    try {
        const options: SessionCookieOptions = { expiresIn: 60 * 60 * 1000 };
        return await authAdmin.createSessionCookie(idToken, options);
    } catch (err) {
        handleVerifyError(err);
    }
}
