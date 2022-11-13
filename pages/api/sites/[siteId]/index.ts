import { get, update, remove } from "~/server/handlers/site";
import authenticate from "~/server/middlewares/authenticate";
import { update as sanitiseUpdate } from "~/server/middlewares/sanitisers/sites";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.use(authenticate).get(get).put(sanitiseUpdate, update).delete(remove);

export default createHandler(router);
