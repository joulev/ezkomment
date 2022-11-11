import { setCookie } from "nookies";
import { createHandler, createRouter } from "~/server/next-connect";
import { authAdmin } from "~/server/firebase/app";

const router = createRouter();

router.post(async (req, res) => {
    const sessionCookie = req.cookies.session || "";
    try {
        const claims = await authAdmin.verifySessionCookie(sessionCookie, true);
        await authAdmin.revokeRefreshTokens(claims.sub);
    } catch (err) {} // even if the cookie is invalid, we still want to sign out
    setCookie({ res }, "session", "", { maxAge: 0, path: "/" });
    res.status(200).json({ status: "success" });
});

export default createHandler(router);
