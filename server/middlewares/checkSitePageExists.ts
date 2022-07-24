import { checkExist } from "~/server/utils/embedUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ApiMiddleware } from "~/types/server/nextApi.type";

export const checkSitePageExists: ApiMiddleware = async (req, _, next) => {
    const { siteId, pageId } = extractFirstQueryValue(req);
    await checkExist(siteId, pageId);
    next();
};
