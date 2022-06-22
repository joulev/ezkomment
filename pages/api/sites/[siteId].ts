import { deleteSite, getSite, updateSite } from "~/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeUpdateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { AuthenticatedApiRequest } from "~/types/server/nextApi.type";

const handler = ncRouter<AuthenticatedApiRequest>()
    .get(attachIdTokenWithJWT, getSite)
    .put(sanitizeUpdateSiteRequest, attachIdTokenWithJWT, updateSite)
    .delete(attachIdTokenWithJWT, deleteSite);

export default handler;
