import { deleteUser, getUser, updateUser } from "~/server/handlers/userHandlers";
import { validateUidWithJWT } from "~/server/middlewares/validateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(getUser)
    .put(validateUidWithJWT, updateUser)
    .delete(validateUidWithJWT, deleteUser);

export default handler;
