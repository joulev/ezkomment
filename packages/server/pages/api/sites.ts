import { createSite } from "@server/handlers/siteHandlers";
import { removeCreateSiteRequestProps } from "@server/middlewares/removeProps";
import { createNextHandler } from "@server/utils/nextHandlerUtils";

export default createNextHandler(
    {
        POST: createSite,
    },
    {
        POST: removeCreateSiteRequestProps,
    }
);
