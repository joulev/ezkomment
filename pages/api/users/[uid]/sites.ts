import { createSite } from "~/server/handlers/siteHandlers";
import { listUserSites } from "~/server/handlers/userHandlers";
import { authenticateUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(authenticateUidWithJWT, listUserSites)
    .post(authenticateUidWithJWT, sanitizeCreateSiteRequest, createSite);

export default handler;
