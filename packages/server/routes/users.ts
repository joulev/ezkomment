import { decodeIDToken, validateRequest } from "../middlewares/validate";
import { Router, json } from "express";

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
// Without <any>, Typescript raise errors?
router.use(<any>decodeIDToken);
router.use(<any>validateRequest);

router.get("/get", <any>getUser);
router.post("/update", <any>updateUser);
router.delete("/delete", <any>deleteUser);

if (process.env.NODE_ENV === "development") {
    router.post("/create", <any>createUser);
    router.post("/import", <any>importUsers);
}

export default router;
