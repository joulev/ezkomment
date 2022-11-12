import { deleteAll, get } from "~/server/handlers/notification";
import authenticate from "~/server/middlewares/authenticate";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.use(authenticate).get(get).delete(deleteAll);

export default createHandler(router);
