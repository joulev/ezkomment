import * as UserHandlers from "@server/handlers/userHandlers";
import { logHello } from "@server/middlewares/logHello";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler(
    {
        GET: UserHandlers.getUser,
        POST: UserHandlers.updateUser,
        DELETE: UserHandlers.deleteUser,
    },
    {
        GET: [...Array(4)].map(_ => logHello),
    }
);
