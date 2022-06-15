import { createPage } from "~/server/handlers/pageHandlers";
import { listSitePages } from "~/server/handlers/siteHandlers";
import { sanitizeCreatePageRequest } from "~/server/middlewares/sanitizeRequest/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(listSitePages).post(sanitizeCreatePageRequest, createPage);

export default handler;
