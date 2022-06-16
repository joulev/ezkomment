import { createSite } from "~/server/handlers/siteHandlers";
import { listUserSites } from "~/server/handlers/userHandlers";
import { sanitizeCreateSiteRequest } from "~/server/middlewares/sanitizeRequest/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(listUserSites).post(sanitizeCreateSiteRequest, createSite);

export default handler;
