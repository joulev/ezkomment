import { deletePage, getPage, updatePage } from "~/server/handlers/pageHandlers";
import { authenticateWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeUpdatePageRequest } from "~/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(authenticateWithJWT, getPage)
    .put(sanitizeUpdatePageRequest, authenticateWithJWT, updatePage)
    .delete(authenticateWithJWT, deletePage);

export default handler;
