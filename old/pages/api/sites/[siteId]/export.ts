import { exportSite } from "~/old/server/handlers/exportHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().get(attachIdTokenWithJWT, exportSite);

export default handler;
