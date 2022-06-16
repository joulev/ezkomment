import { deleteUser, getUser, updateUser } from "~/server/handlers/userHandlers";
import { authenticateUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(getUser)
    .put(authenticateUidWithJWT, updateUser)
    .delete(authenticateUidWithJWT, deleteUser);

export default handler;
