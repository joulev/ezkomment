import { deleteSite, getSite, updateSite } from "~/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeUpdateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(attachIdTokenWithJWT, getSite)
    .put(sanitizeUpdateSiteRequest, attachIdTokenWithJWT, updateSite)
    .delete(attachIdTokenWithJWT, deleteSite);

export default handler;
