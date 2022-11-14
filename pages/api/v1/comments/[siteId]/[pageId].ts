import cors from "cors";
import { expressWrapper } from "next-connect";
import {
    createHandler,
    createRouter,
    ApiMiddleware,
    extractFirstQueryValue,
} from "~/server/next-connect";
import checkExists from "~/server/middlewares/check-exists";
import { getApprovedCommentsRaw } from "~/server/handlers/page";
import { create } from "~/server/handlers/comment";
import { create as sanitiseCreate } from "~/server/middlewares/sanitisers/comment";

const router = createRouter();

const addPageIdToBody: ApiMiddleware = (req, _, next) => {
    const { pageId } = extractFirstQueryValue(req);
    req.body.pageId = pageId;
    next();
};

router
    .all(expressWrapper(cors({ origin: "*" })))
    .use(checkExists)
    .get(getApprovedCommentsRaw)
    .post(addPageIdToBody, sanitiseCreate, create);

export default createHandler(router);
