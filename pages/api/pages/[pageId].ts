import { deletePage, getPage, updatePage } from "~/server/handlers/pageHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeUpdatePageRequest } from "~/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(attachIdTokenWithJWT, getPage)
    .put(sanitizeUpdatePageRequest, attachIdTokenWithJWT, updatePage)
    .delete(attachIdTokenWithJWT, deletePage);

export default handler;
