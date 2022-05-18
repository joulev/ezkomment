import {
  signOut as firebaseSignOut,
  getAuth
} from "firebase/auth";

import { Request, Response } from "express";

import firebaseApp from "../lib/firebaseApp";

const auth = getAuth(firebaseApp);

export async function signOut(req: Request, res: Response) {
  await firebaseSignOut(auth);
}