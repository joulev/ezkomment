import { deleteUser, getUser, updateUser } from "~/server/handlers/userHandlers";
import { authenticateUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeUpdateUserRequest } from "~/server/middlewares/sanitizeRequests/users";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(authenticateUidWithJWT, getUser)
    .put(authenticateUidWithJWT, sanitizeUpdateUserRequest, updateUser)
    .delete(authenticateUidWithJWT, deleteUser);

export default handler;
