import { setCookie } from "nookies";
import { createHandler, createRouter } from "~/server/next-connect";
import { authAdmin } from "~/server/firebase/app";
import checkCSRF from "~/server/middlewares/check-csrf";

const router = createRouter();

router.post(checkCSRF, async (req, res) => {
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
    res.status(200).json({ status: "success" });
});

export default createHandler(router);
