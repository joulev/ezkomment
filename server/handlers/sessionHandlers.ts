import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

import { createSessionCookie } from "~/server/utils/authUtils";
import { reportBadRequest } from "~/server/utils/nextHandlerUtils";

export async function login(req: NextApiRequest, res: NextApiResponse) {
    const idToken = req.headers.authorization;
    try {
        const sessionCookie = await createSessionCookie(idToken);
        const options: CookieSerializeOptions = {
            httpOnly: true,
            secure: true,
        };
        res.setHeader("Set-Cookie", serialize("session", sessionCookie, options));
        res.status(200).json({ message: "Created session cookie" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create cookie when logged in");
    }
}
