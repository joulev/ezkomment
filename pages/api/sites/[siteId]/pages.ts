import { createPage } from "~/server/handlers/pageHandlers";
import { listSitePages } from "~/server/handlers/siteHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(listSitePages).post(createPage);

export default handler;
