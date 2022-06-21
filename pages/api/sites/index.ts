import { createSite } from "~/server/handlers/siteHandlers";
import { authenticateWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(authenticateWithJWT, sanitizeCreateSiteRequest, createSite);

export default handler;
