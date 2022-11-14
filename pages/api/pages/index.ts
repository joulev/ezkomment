import { create } from "~/server/handlers/page";
import { createHandler, createRouter } from "~/server/next-connect";
import { create as sanitiseCreate } from "~/server/middlewares/sanitisers/page";
import authenticate from "~/server/middlewares/authenticate";
import checkCSRF from "~/server/middlewares/check-csrf";

const router = createRouter();
router.post(checkCSRF, authenticate, sanitiseCreate, create);

export default createHandler(router);
