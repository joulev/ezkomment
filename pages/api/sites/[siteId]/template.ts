import { createHandler, createRouter } from "~/server/next-connect";
import authenticate from "~/server/middlewares/authenticate";
import { getTemplate, updateTemplate } from "~/server/handlers/site";
import { updateTemplate as sanitiseUpdate } from "~/server/middlewares/sanitisers/site";

const router = createRouter();
router.use(authenticate).get(getTemplate).put(sanitiseUpdate, updateTemplate);

export default createHandler(router);
