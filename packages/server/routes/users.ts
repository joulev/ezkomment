import { Router, json } from "express";

import { createUser, deleteUser, getUser, updateUser } from "../utils/userUtils";

const router = Router();

/** Sign in routes
 * router.post("/auth/signin/github", signInGitHub);
 * router.post("/auth/signin/google", signInGoogle);
 * router.post("/auth/signin/email", signInEmailLink);
 * (Authentication is done in the frontend)
 */

// use middlewares to parse json.
router.use(json());

// Fetch basic user data.
router.get("/get", getUser);
// This route must only be used when an user sign up for the app.
router.post("create", createUser);

// These two routes must only be used when an user has already signed in.
router.post("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
