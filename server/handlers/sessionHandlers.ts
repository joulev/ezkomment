/**
 * Implement some handlers to deal with session cookie, in case we need this.
 * Currently, we will use raw id tokens.
 */
import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest } from "next";

import { createSessionCookie } from "~/server/utils/authUtils";
import { reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { ApiResponse } from "~/types/server/nextApi.type";

export async function login(req: NextApiRequest, res: ApiResponse) {
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
