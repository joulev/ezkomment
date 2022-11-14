import { createHandler, createRouter } from "~/server/next-connect";
import authenticate from "~/server/middlewares/authenticate";
import { getExport } from "~/server/handlers/user";

const router = createRouter();
router.get(authenticate, getExport);

export default createHandler(router);
