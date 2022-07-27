import { verifyUserEmail } from "~/server/handlers/userHandlers";
import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().put(authenticatePathUidWithJWT, verifyUserEmail);

export default handler;
