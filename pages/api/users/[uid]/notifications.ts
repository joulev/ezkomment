import { listUserNotifications } from "~/server/handlers/userHandlers";
import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(authenticatePathUidWithJWT, listUserNotifications);

export default handler;
