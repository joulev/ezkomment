import * as SiteHandler from "@server/handlers/siteHandler";
import { createNextHandler } from "@server/utils/extraUtils";

export default createNextHandler({
    GET: SiteHandler.getSite,
    POST: SiteHandler.updateSite,
    DELETE: SiteHandler.deleteSite,
});
