import { SessionCookieOptions } from "firebase-admin/auth";

import { authAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";

function handleError(err: unknown): never {
    if (err instanceof Error) {
        const code = (err as any).errorInfo?.code ?? "";
        console.log(code);
        // auth/argument-error is not even mentioned in the documentation, wtf??
        if (
            code === "auth/user-disabled" ||
            code === "auth/id-token-revoked" ||
            code === "auth/id-token-expired" ||
            code === "auth/session-cookie-expired" ||
            code === "auth/session-cookie-revoked" ||
            code === "auth/argument-error"
        )
            throw new CustomApiError(err, 403);
    }
    throw err;
}

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
        handleError(err);
    }
}

export async function verifySessionCookie(cookie?: string) {
    if (!cookie) {
        throw new CustomApiError("No session cookie", 403);
    }
    try {
        return await authAdmin.verifySessionCookie(cookie, true);
    } catch (err) {
        handleError(err);
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
        handleError(err);
    }
}
