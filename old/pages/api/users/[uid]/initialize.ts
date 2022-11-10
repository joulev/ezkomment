import { initializeUser } from "~/old/server/handlers/userHandlers";
import { authenticatePathUidWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().post(authenticatePathUidWithJWT, initializeUser);

export default handler;
