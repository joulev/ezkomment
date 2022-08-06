import {
    deleteUserNotifications,
    listUserNotifications,
} from "~/server/handlers/notificationHandlers";
import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(authenticatePathUidWithJWT, listUserNotifications)
    .delete(authenticatePathUidWithJWT, deleteUserNotifications);

export default handler;
