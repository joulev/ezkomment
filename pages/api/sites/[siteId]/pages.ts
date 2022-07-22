import { listSitePages } from "~/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(attachIdTokenWithJWT, listSitePages);

export default handler;
