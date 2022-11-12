import { createHandler, createRouter } from "~/server/next-connect";
import authenticate from "~/server/middlewares/authenticate";
import { getStatistics } from "~/server/handlers/site";

const router = createRouter();
router.get(authenticate, getStatistics);

export default createHandler(router);
