import { PageConfig } from "next";
import { createHandler, createRouter } from "~/server/next-connect";
import { uploadIcon } from "~/server/handlers/site";
import checkCSRF from "~/server/middlewares/check-csrf";
import authenticate from "~/server/middlewares/authenticate";
import { parseSiteIcon } from "~/server/middlewares/parse-photo";

export const config: PageConfig = { api: { bodyParser: false } };

const router = createRouter();
router.put(checkCSRF, authenticate, parseSiteIcon, uploadIcon);

export default createHandler(router);
