import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";

import { Request, Response } from "express";

import firebaseApp from "@server/lib/firebaseApp";

const auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

export async function signInGitHub(req: Request, res: Response) {
  // TODO: Handle error and deal with response
  const result: UserCredential = await signInWithPopup(auth, githubProvider);
}

export async function signInGoogle(req: Request, res: Response) {
  const result: UserCredential = await signInWithPopup(auth, googleProvider);
}

export async function signInEmailLink(req: Request, res: Response) {
  const href: string = req.body.href;
  const email: string = req.body.email;
  if (!isSignInWithEmailLink(auth, href)) {
    res.statusCode = 404;
    // throw Error?
    throw Error("Invalid email link - cannot sign in");
  }
  const result: UserCredential = await signInWithEmailLink(auth, email, href);
}