import { ApiMiddleware } from "~/server/next-connect";
import CustomApiError from "~/server/errors/customApiError";

const checkCSRF: ApiMiddleware = (req, _, next) => {
    if (req.method === "GET" || req.method === "HEAD") return next();
    const csrfToken = req.headers["x-csrf-token"];
    if (!csrfToken || csrfToken !== req.cookies["csrfToken"])
        throw new CustomApiError("Unauthorised", 401);
    next();
};

export default checkCSRF;
