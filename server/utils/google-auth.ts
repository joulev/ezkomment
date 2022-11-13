import { SignJWT } from "jose";

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#pkcs_8_import
 */
function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) bufView[i] = str.charCodeAt(i);
    return buf;
}

function getSecret(): ArrayBuffer {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
    const pkcs8 = privateKey
        .replace(/\\n/g, "")
        .replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "");
    return str2ab(atob(pkcs8));
}

async function getPrivateKey(): Promise<CryptoKey> {
    const secret = getSecret();
    const key = await crypto.subtle.importKey(
        "pkcs8",
        secret,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        true,
        ["sign"]
    );
    return key;
}

async function getJwt(): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour

    const privateKey = await getPrivateKey();

    return await new SignJWT({
        iss: process.env.FIREBASE_CLIENT_EMAIL,
        scope: "https://www.googleapis.com/auth/datastore",
        aud: "https://oauth2.googleapis.com/token",
    })
        .setProtectedHeader({ alg: "RS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(privateKey);
}

/**
 * An Edge-friendly function to get the access token to access Firestore REST API
 * @returns {Promise<string>} The access token
 */
export default async function getAccessToken(): Promise<string> {
    const jwt = await getJwt();
    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });
    const data = await res.json();
    return data.access_token;
}
