import { get, create, update, remove } from "~/server/handlers/user";
import authenticate from "~/server/middlewares/authenticate";
import { update as sanitiseUpdate } from "~/server/middlewares/sanitisers/user";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.use(authenticate).get(get).post(create).put(sanitiseUpdate, update).delete(remove);

export default createHandler(router);
