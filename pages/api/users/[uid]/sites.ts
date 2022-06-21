import { listUserSites } from "~/server/handlers/userHandlers";
import { authenticateUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(authenticateUidWithJWT, listUserSites);

export default handler;
