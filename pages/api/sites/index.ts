import { createSite } from "~/server/handlers/siteHandlers";
import { authenticateBodyUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(sanitizeCreateSiteRequest, authenticateBodyUidWithJWT, createSite);

export default handler;
