import { createHandler, createRouter } from "~/server/next-connect";
import { getApprovedComments } from "~/server/handlers/page";

const router = createRouter();
router.get(getApprovedComments);

export default createHandler(router);
