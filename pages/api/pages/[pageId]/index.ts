import { get, update, remove } from "~/server/handlers/page";
import { createHandler, createRouter } from "~/server/next-connect";
import { update as sanitiseUpdate } from "~/server/middlewares/sanitisers/page";
import authenticate from "~/server/middlewares/authenticate";
import checkCSRF from "~/server/middlewares/check-csrf";

const router = createRouter();
router.use(checkCSRF, authenticate).get(get).put(sanitiseUpdate, update).delete(remove);

export default createHandler(router);
