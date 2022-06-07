import * as SiteHandler from "@server/handlers/siteHandlers";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler({
    GET: SiteHandler.getSite,
    POST: SiteHandler.updateSite,
    DELETE: SiteHandler.deleteSite,
});
