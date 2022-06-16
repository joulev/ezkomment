import { deleteSite, getSite, updateSite } from "~/server/handlers/siteHandlers";
import { authenticateWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeUpdateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(getSite)
    .put(authenticateWithJWT, sanitizeUpdateSiteRequest, updateSite)
    .delete(authenticateWithJWT, deleteSite);

export default handler;
