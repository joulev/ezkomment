import { deleteNotification } from "~/server/handlers/notificationHandlers";
import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().delete(authenticatePathUidWithJWT, deleteNotification);

export default handler;
