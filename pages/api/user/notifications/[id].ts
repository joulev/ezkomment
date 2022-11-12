import { createHandler, createRouter } from "~/server/next-connect";
import authenticate from "~/server/middlewares/authenticate";
import { deleteById } from "~/server/handlers/notification";

const router = createRouter();
router.delete(authenticate, deleteById);

export default createHandler(router);
