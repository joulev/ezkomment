import { createPage } from "~/server/handlers/pageHandlers";
import { listSitePages } from "~/server/handlers/siteHandlers";
import { authenticateWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreatePageRequest } from "~/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(listSitePages)
    .post(authenticateWithJWT, sanitizeCreatePageRequest, createPage);

export default handler;
