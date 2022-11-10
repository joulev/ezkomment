import { getSiteStatistic } from "~/server/handlers/statisticHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(async (req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        req.user = { uid: "Some uid" } as any;
        next();
        return;
    }
    await attachIdTokenWithJWT(req, res, next);
}, getSiteStatistic);

export default handler;
