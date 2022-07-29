import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { initializeUser } from "~/server/utils/crud/userUtils";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(authenticatePathUidWithJWT, initializeUser);

export default handler;
