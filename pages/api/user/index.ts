import { get } from "~/server/handlers/user";
import authenticate from "~/server/middlewares/authenticate";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.use(authenticate).get(get);

export default createHandler(router);
