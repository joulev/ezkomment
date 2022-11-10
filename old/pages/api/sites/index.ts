import { createSite } from "~/old/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { sanitizeCreateSiteRequest } from "~/old/server/middlewares/sanitizeRequests/sites";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().post(sanitizeCreateSiteRequest, attachIdTokenWithJWT, createSite);

export default handler;
