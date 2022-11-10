import { deleteUser, getUser, updateUser } from "~/old/server/handlers/userHandlers";
import { authenticatePathUidWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { sanitizeUpdateUserRequest } from "~/old/server/middlewares/sanitizeRequests/users";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(authenticatePathUidWithJWT, getUser)
    .put(sanitizeUpdateUserRequest, authenticatePathUidWithJWT, updateUser)
    .delete(authenticatePathUidWithJWT, deleteUser);

export default handler;
