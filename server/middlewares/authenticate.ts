import { setCookie } from "nookies";
import { ApiMiddleware } from "~/server/next-connect";
import CustomApiError from "~/server/errors/custom-api-error";
import { getUidFromSessionCookie } from "~/server/utils/auth";

const authenticate: ApiMiddleware = async (req, res, next) => {
    try {
        req.uid = await getUidFromSessionCookie(req.cookies.session);
        await next();
    } catch (err) {
        setCookie({ res }, "session", "", { maxAge: 0, path: "/" });
        throw new CustomApiError("Session cookie is invalid or has expired", 401);
    }
};

export default authenticate;
