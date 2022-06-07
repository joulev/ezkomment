import * as SessionHandlers from "@server/handlers/sessionHandlers";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler({
    POST: SessionHandlers.login,
});
