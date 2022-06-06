import { authAdmin } from "@server/firebase/firebaseAdmin";

/**
 * Checks whether the current user is authorized using JWT.
 *
 * @param uid The current user's uid
 * @param jwt The JWT sent together with the requests
 * @returns Whether the current user's uid is equal to the targeted document's uid.
 */
export async function validateJWT(uid: string, jwt?: string) {
    if (process.env.NODE_ENV === "development") return true;
    if (!jwt?.startsWith("Bearer ")) return false;
    const idToken = jwt.split("Bearer ")[1];
    try {
        const decodedToken = await authAdmin.verifyIdToken(idToken);
        return decodedToken.uid === uid;
    } catch (error) {
        throw error;
    }
}

/**
 * Creates a session cookie.
 * @param idToken The id token string sent with the request
 * @returns The session cookie
 */
export async function createSessionCookie(idToken: string) {
    const expiresIn = 60 * 60 * 1000; // 1 hour
    return await authAdmin.createSessionCookie(idToken, { expiresIn });
}
