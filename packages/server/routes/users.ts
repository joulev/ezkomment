import { Router, json } from "express";

import * as userHandlers from "@server/handlers/userHandlers";
import { validateRequest } from "@server/middlewares/validateRequest";

const router = Router({
    mergeParams: true,
});

// use middlewares to parse json.
router.use(json());

// Make sure that the user can only access their own data
router.use(validateRequest);

router
    .route("/:uid")
    .get(userHandlers.getUser)
    .put(userHandlers.updateUser)
    .delete(userHandlers.deleteUser);

router
    .route("/:uid/sites") // get all sites of a user
    .get(userHandlers.listUserSites);

if (process.env.NODE_ENV === "development") {
    router.post("/", userHandlers.createUser);
    router.post("/import", userHandlers.importUsers);
}

const userRouter = router;
export default userRouter;
