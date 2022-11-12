import { createHandler, createRouter } from "~/server/next-connect";
import { signOut } from "~/server/handlers/auth";

const router = createRouter();
router.post(signOut);

export default createHandler(router);
