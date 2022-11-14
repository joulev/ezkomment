import { get, update, remove } from "~/server/handlers/site";
import { createHandler, createRouter } from "~/server/next-connect";
import authenticate from "~/server/middlewares/authenticate";
import checkCSRF from "~/server/middlewares/check-csrf";
import { update as sanitiseUpdate } from "~/server/middlewares/sanitisers/site";

const router = createRouter();
router.use(checkCSRF, authenticate).get(get).put(sanitiseUpdate, update).delete(remove);

export default createHandler(router);
