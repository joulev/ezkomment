import { exportPage } from "~/server/handlers/exportHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(attachIdTokenWithJWT, exportPage);

export default handler;
