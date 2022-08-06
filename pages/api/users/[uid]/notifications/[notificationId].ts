import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { deleteNotificationWithUid } from "~/server/utils/crud/notificationUtils";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().delete(authenticatePathUidWithJWT, deleteNotificationWithUid);

export default handler;
