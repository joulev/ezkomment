import { listSitePages } from "~/server/handlers/siteHandlers";
import { authenticateWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(authenticateWithJWT, listSitePages);

export default handler;
