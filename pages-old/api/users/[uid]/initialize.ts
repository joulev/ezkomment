import { initializeUser } from "~/server/handlers/userHandlers";
import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(authenticatePathUidWithJWT, initializeUser);

export default handler;
