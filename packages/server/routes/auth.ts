import { Router } from "express";

import { 
  signInGitHub, 
  signInGoogle, 
  signInEmailLink 
} from "../utils/signIn";

const router = Router();

// Sign in routes
router.post('/auth/signin/github', signInGitHub);
router.post('/auth/signin/google', signInGoogle);
router.post('/auth/signin/email', signInEmailLink);

// Session, cookies?

export default router;