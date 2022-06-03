import * as UserHandlers from "@server/handlers/userHandlers";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler({
    GET: UserHandlers.getUser,
    POST: UserHandlers.updateUser,
    DELETE: UserHandlers.deleteUser,
});
