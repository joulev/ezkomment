import * as SiteHandler from "@server/handlers/siteHandler";
import { createNextHandler } from "@server/utils/extraUtils";

export default createNextHandler({
    POST: SiteHandler.createSite,
});
