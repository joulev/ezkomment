import { checkExist } from "~/old/server/utils/embedUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { ApiMiddleware } from "~/old/types/server/nextApi.type";

export const checkSitePageExists: ApiMiddleware = async (req, _, next) => {
    const { siteId, pageId } = extractFirstQueryValue(req);
    await checkExist(siteId, pageId);
    next();
};
