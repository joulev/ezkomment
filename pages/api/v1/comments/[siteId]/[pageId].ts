import cors from "cors";

import { createComment } from "~/server/handlers/commentHandlers";
import { listPageApprovedCommentsRaw } from "~/server/handlers/pageHandlers";
import { checkSitePageExists } from "~/server/middlewares/checkSitePageExists";
import { sanitizeCreateCommentRequest } from "~/server/middlewares/sanitizeRequests/comments";
import { ncRouter } from "~/server/utils/nextHandlerUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { ApiMiddleware } from "~/types/server/nextApi.type";

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
