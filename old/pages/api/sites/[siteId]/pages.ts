import { listSitePages } from "~/old/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().get(attachIdTokenWithJWT, listSitePages);

export default handler;
