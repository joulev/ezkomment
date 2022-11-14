import { createHandler, createRouter } from "~/server/next-connect";
import { create } from "~/server/handlers/comment";
import { create as sanitiseCreate } from "~/server/middlewares/sanitisers/comment";

const router = createRouter();
router.post(sanitiseCreate, create);

export default createHandler(router);
