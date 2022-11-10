import {
    deleteUserNotifications,
    listUserNotifications,
} from "~/old/server/handlers/notificationHandlers";
import { authenticatePathUidWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(authenticatePathUidWithJWT, listUserNotifications)
    .delete(authenticatePathUidWithJWT, deleteUserNotifications);

export default handler;
