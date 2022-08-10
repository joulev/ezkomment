import { exportSite } from "~/server/handlers/exportHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(attachIdTokenWithJWT, exportSite);

export default handler;
