import * as UserHandlers from "@ezkomment/server/handlers/userHandlers";
import { createNextHandler } from "@ezkomment/server/utils/nextHandlerUtils";

export default createNextHandler({
    GET: UserHandlers.listUserSites,
});
