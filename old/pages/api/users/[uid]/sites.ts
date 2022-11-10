import { listUserSites } from "~/old/server/handlers/userHandlers";
import { authenticatePathUidWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().get(authenticatePathUidWithJWT, listUserSites);

export default handler;
