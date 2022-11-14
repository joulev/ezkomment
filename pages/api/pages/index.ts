import { create } from "~/server/handlers/page";
import authenticate from "~/server/middlewares/authenticate";
import { create as sanitiseCreate } from "~/server/middlewares/sanitisers/page";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.post(authenticate, sanitiseCreate, create);

export default createHandler(router);
