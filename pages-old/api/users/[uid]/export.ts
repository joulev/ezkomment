import { exportUser } from "~/server/handlers/exportHandlers";
import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(authenticatePathUidWithJWT, exportUser);

export default handler;
