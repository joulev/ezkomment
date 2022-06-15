import { deletePage, getPage, updatePage } from "~/server/handlers/pageHandlers";
import { sanitizeUpdatePageRequest } from "~/server/middlewares/sanitizeRequest/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(getPage)
    .put(sanitizeUpdatePageRequest, updatePage)
    .delete(deletePage);

export default handler;
