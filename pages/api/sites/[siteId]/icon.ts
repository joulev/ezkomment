import { PageConfig } from "next";
import { createHandler, createRouter } from "~/server/next-connect";
import { uploadIcon } from "~/server/handlers/site";
import authenticate from "~/server/middlewares/authenticate";
import { parseSiteIcon } from "~/server/middlewares/parse-photo";

export const config: PageConfig = { api: { bodyParser: false } };

const router = createRouter();
router.put(authenticate, parseSiteIcon, uploadIcon);

export default createHandler(router);
