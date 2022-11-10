import { ApiMiddleware } from "~/server/next-connect";
import { authAdmin } from "~/server/firebase/app";
import { handleVerifyError } from "~/server/errors/handleAuthError";

const authenticate: ApiMiddleware = async (req, _, next) => {
    const sessionCookie = req.cookies.session || "";
    const decodedClaims = await authAdmin
        .verifySessionCookie(sessionCookie, true)
        .catch(handleVerifyError);
    req.uid = decodedClaims.uid;
    next();
};

export default authenticate;
