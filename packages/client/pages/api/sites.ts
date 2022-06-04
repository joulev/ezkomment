import * as SiteHandler from "@ezkomment/server/handlers/siteHandler";
import { createNextHandler } from "@ezkomment/server/utils/nextHandlerUtils";

export default createNextHandler({
    POST: SiteHandler.createSite,
});
