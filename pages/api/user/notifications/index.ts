import { deleteAll, get } from "~/server/handlers/notification";
import { createHandler, createRouter } from "~/server/next-connect";
import authenticate from "~/server/middlewares/authenticate";
import checkCSRF from "~/server/middlewares/check-csrf";

const router = createRouter();
router.use(checkCSRF, authenticate).get(get).delete(deleteAll);

export default createHandler(router);
