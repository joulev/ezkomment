import { Router, json } from "express";

import { decodeIDToken, validateRequest } from "../middlewares/validate";
import { createUser, deleteUser, getUser, importUsers, updateUser } from "../utils/userUtils";

const router = Router();

/** Sign in routes
 * router.post("/auth/signin/github", signInGitHub);
 * router.post("/auth/signin/google", signInGoogle);
 * router.post("/auth/signin/email", signInEmailLink);
 * (Authentication is done in the frontend)
 */

// use middlewares to parse json.
router.use(json());

// Make sure that the user can only access their own data
// Without , Typescript raise errors?
router.use(decodeIDToken);
router.use(validateRequest);

router.get("/get", getUser);
router.post("/update", updateUser);
router.delete("/delete", deleteUser);

if (process.env.NODE_ENV === "development") {
    router.post("/create", createUser);
    router.post("/import", importUsers);
}

const userRouter = router;
export default userRouter;
