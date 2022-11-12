import { setCookie } from "nookies";
import { ApiHandler } from "~/server/next-connect";
import { authAdmin } from "~/server/firebase/app";

export const signIn: ApiHandler = async (req, res) => {
    const { idToken } = req.body;
    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days
    const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });
    const options = {
        maxAge: expiresIn / 1000,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    } as const;
    setCookie({ res }, "session", sessionCookie, options);
    res.json({});
};

export const signOut: ApiHandler = async (req, res) => {
    const sessionCookie = req.cookies.session || "";
    try {
        const claims = await authAdmin.verifySessionCookie(sessionCookie, true);
        await authAdmin.revokeRefreshTokens(claims.sub);
    } catch (err) {} // even if the cookie is invalid, we still want to sign out
    setCookie({ res }, "session", "", { maxAge: 0, path: "/" });
    res.json({});
};
