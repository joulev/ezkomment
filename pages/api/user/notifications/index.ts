import { deleteAll } from "~/server/handlers/notification";
import authenticate from "~/server/middlewares/authenticate";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.delete(authenticate, deleteAll);

export default createHandler(router);
