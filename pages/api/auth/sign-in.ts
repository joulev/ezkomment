import { createHandler, createRouter } from "~/server/next-connect";
import checkCSRF from "~/server/middlewares/check-csrf";
import { signIn } from "~/server/handlers/auth";

const router = createRouter();
router.post(checkCSRF, signIn);

export default createHandler(router);
