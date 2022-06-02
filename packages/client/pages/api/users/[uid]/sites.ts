import * as UserHandlers from "@server/handlers/userHandlers";
import { createNextHandler } from "@server/utils/extraUtils";

export default createNextHandler({
    GET: UserHandlers.listUserSites,
});
