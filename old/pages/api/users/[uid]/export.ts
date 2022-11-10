import { exportUser } from "~/old/server/handlers/exportHandlers";
import { authenticatePathUidWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().get(authenticatePathUidWithJWT, exportUser);

export default handler;
