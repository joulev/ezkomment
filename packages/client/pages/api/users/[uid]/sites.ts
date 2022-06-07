import * as UserHandlers from "@server/handlers/userHandlers";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler({
    GET: UserHandlers.listUserSites,
});
