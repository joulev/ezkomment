import { get, create, update, remove } from "~/server/handlers/user";
import { createHandler, createRouter } from "~/server/next-connect";
import { update as sanitiseUpdate } from "~/server/middlewares/sanitisers/user";
import authenticate from "~/server/middlewares/authenticate";
import checkCSRF from "~/server/middlewares/check-csrf";

const router = createRouter();
router
    .use(checkCSRF, authenticate)
    .get(get)
    .post(create)
    .put(sanitiseUpdate, update)
    .delete(remove);

export default createHandler(router);
