import * as SiteHandler from "@ezkomment/server/handlers/siteHandler";
import { createNextHandler } from "@ezkomment/server/utils/nextHandlerUtils";

export default createNextHandler({
    GET: SiteHandler.getSite,
    POST: SiteHandler.updateSite,
    DELETE: SiteHandler.deleteSite,
});
