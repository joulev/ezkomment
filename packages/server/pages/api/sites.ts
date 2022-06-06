import * as SiteHandler from "@server/handlers/siteHandlers";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler({
    POST: SiteHandler.createSite,
});
