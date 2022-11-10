import { deletePage, getPage, updatePage } from "~/old/server/handlers/pageHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { sanitizeUpdatePageRequest } from "~/old/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(attachIdTokenWithJWT, getPage)
    .put(sanitizeUpdatePageRequest, attachIdTokenWithJWT, updatePage)
    .delete(attachIdTokenWithJWT, deletePage);

export default handler;
