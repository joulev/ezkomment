import { create } from "~/server/handlers/site";
import authenticate from "~/server/middlewares/authenticate";
import { create as sanitiseCreate } from "~/server/middlewares/sanitisers/site";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.post(authenticate, sanitiseCreate, create);

export default createHandler(router);
