import { SessionCookieOptions } from "firebase-admin/auth";

import { authAdmin } from "@server/firebase/firebaseAdmin";

/**
 * Checks whether the current user is authorized using JWT.
 *
 * @param jwt The JWT sent together with the requests
 * @returns Whether the current user's uid is equal to the targeted document's uid.
 */
export async function verifyJWT(jwt?: string) {
    if (!jwt?.startsWith("Bearer ")) throw Error("Invalid id token");
    const idToken = jwt.split("Bearer ")[1];
    return await authAdmin.verifyIdToken(idToken);
}

export async function verifySessionCookie(cookie?: string) {
    if (!cookie) throw Error("No session cookie!");
    return await authAdmin.verifySessionCookie(cookie);
}

/**
 * Creates a session cookie.
 *
 * @param idToken The id token sent together with the requests
 * @returns The session cookie
 */
export async function createSessionCookie(idToken?: string) {
    if (!idToken) throw Error("Empty id token token");
    const options: SessionCookieOptions = {
        expiresIn: 60 * 60 * 1000, // 1 hour
    };
    return await authAdmin.createSessionCookie(idToken, options);
}
