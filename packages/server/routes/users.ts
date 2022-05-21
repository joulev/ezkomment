import { Router, json } from "express";

import { createUser, deleteUser, getUser, updateUser } from "../utils/userUtils";

const router = Router();

/** Sign in routes
 * router.post("/auth/signin/github", signInGitHub);
 * router.post("/auth/signin/google", signInGoogle);
 * router.post("/auth/signin/email", signInEmailLink);
 * (Authentication is done in the frontend)
 */

// use middlewares to parse json
router.use(json());

router.route("/users").get(getUser).post(createUser).delete(deleteUser);

export default router;
