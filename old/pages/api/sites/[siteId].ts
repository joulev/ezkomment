import { deleteSite, getSite, updateSite } from "~/old/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { sanitizeUpdateSiteRequest } from "~/old/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(attachIdTokenWithJWT, getSite)
    .put(sanitizeUpdateSiteRequest, attachIdTokenWithJWT, updateSite)
    .delete(attachIdTokenWithJWT, deleteSite);

export default handler;
