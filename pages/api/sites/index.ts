import { createSite } from "~/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreateSiteRequest } from "~/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(sanitizeCreateSiteRequest, attachIdTokenWithJWT, createSite);

export default handler;
