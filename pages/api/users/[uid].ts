import { deleteUser, getUser, updateUser } from "~/server/handlers/userHandlers";
import { authenticatePathUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeUpdateUserRequest } from "~/server/middlewares/sanitizeRequests/users";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(authenticatePathUidWithJWT, getUser)
    .put(sanitizeUpdateUserRequest, authenticatePathUidWithJWT, updateUser)
    .delete(authenticatePathUidWithJWT, deleteUser);

export default handler;
