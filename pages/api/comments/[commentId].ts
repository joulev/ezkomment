import { createHandler, createRouter } from "~/server/next-connect";
import { update, remove } from "~/server/handlers/comment";
import authenticate from "~/server/middlewares/authenticate";
import { update as sanitiseUpdate } from "~/server/middlewares/sanitisers/comment";
import checkCSRF from "~/server/middlewares/check-csrf";

const router = createRouter();
router.use(checkCSRF, authenticate).put(sanitiseUpdate, update).delete(remove);

export default createHandler(router);
