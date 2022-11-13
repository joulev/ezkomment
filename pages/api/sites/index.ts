import { post } from "~/server/handlers/site";
import authenticate from "~/server/middlewares/authenticate";
import { create as sanitiseCreate } from "~/server/middlewares/sanitisers/sites";
import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter();
router.post(authenticate, sanitiseCreate, post);

export default createHandler(router);
