import { createHandler, createRouter } from "~/server/next-connect";
import authenticate from "~/server/middlewares/authenticate";
import { getExport } from "~/server/handlers/site";

const router = createRouter();
router.get(authenticate, getExport);

export default createHandler(router);
