import * as SiteHandler from "@server/handlers/siteHandler";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler({
    POST: SiteHandler.createSite,
});
