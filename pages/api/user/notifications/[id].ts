import { createHandler, createRouter } from "~/server/next-connect";
import checkCSRF from "~/server/middlewares/check-csrf";
import authenticate from "~/server/middlewares/authenticate";
import { deleteById } from "~/server/handlers/notification";

const router = createRouter();
router.delete(checkCSRF, authenticate, deleteById);

export default createHandler(router);
