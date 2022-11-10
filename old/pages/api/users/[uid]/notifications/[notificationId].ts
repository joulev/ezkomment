import { deleteNotification } from "~/old/server/handlers/notificationHandlers";
import { authenticatePathUidWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().delete(authenticatePathUidWithJWT, deleteNotification);

export default handler;
