import { createSite } from "~/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { AuthenticatedApiRequest } from "~/types/server/nextApi.type";

const handler = ncRouter<AuthenticatedApiRequest>().post(
    sanitizeCreateSiteRequest,
    attachIdTokenWithJWT,
    createSite
);

export default handler;
