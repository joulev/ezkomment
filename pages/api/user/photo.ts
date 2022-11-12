import { PageConfig } from "next";
import { createHandler, createRouter } from "~/server/next-connect";
import { uploadPhoto } from "~/server/handlers/user";
import authenticate from "~/server/middlewares/authenticate";
import { parsePhoto } from "~/server/middlewares/parse-photo";

export const config: PageConfig = { api: { bodyParser: false } };

const router = createRouter();
router.put(authenticate, parsePhoto, uploadPhoto);

export default createHandler(router);
