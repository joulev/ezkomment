import { authAdmin } from "~/server/firebase/app";

export async function getUidFromSessionCookie(sessionCookie: string | null | undefined) {
    const decodedClaims = await authAdmin.verifySessionCookie(sessionCookie || "", true);
    return decodedClaims.uid;
}
