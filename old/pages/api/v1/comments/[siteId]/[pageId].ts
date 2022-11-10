import cors from "cors";

import { createComment } from "~/old/server/handlers/commentHandlers";
import { listPageApprovedCommentsRaw } from "~/old/server/handlers/pageHandlers";
import { checkSitePageExists } from "~/old/server/middlewares/checkSitePageExists";
import { sanitizeCreateCommentRequest } from "~/old/server/middlewares/sanitizeRequests/comments";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { ApiMiddleware } from "~/old/types/server/nextApi.type";

const addPageIdToBody: ApiMiddleware = (req, _, next) => {
    const { pageId } = extractFirstQueryValue(req);
    req.body.pageId = pageId;
    next();
};

const handler = ncRouter()
    .options(cors({ origin: "*" }))
    .use(cors({ origin: "*" }))
    .use(checkSitePageExists)
    .get(listPageApprovedCommentsRaw)
    .post(addPageIdToBody, sanitizeCreateCommentRequest, createComment);

export default handler;
