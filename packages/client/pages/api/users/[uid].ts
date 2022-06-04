import * as UserHandlers from "@ezkomment/server/handlers/userHandlers";
import { logHello } from "@ezkomment/server/middlewares/logHello";
import { createNextHandler } from "@ezkomment/server/utils/nextHandlerUtils";

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
