import { deleteSite, getSite, updateSite } from "~/server/handlers/siteHandlers";
import { sanitizeUpdateSiteRequest } from "~/server/middlewares/sanitizeRequest/sites";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(getSite)
    .put(sanitizeUpdateSiteRequest, updateSite)
    .delete(deleteSite);

export default handler;
