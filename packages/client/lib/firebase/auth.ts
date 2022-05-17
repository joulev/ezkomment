import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    getAuth,
    signInWithPopup,
} from "firebase/auth";

import { AppAuth } from "@client/types/auth.type";

import firebaseApp from "./app";

const auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

export async function signInGitHub({ setLoading }: AppAuth) {
    setLoading(true);
    await signInWithPopup(auth, githubProvider);
    setLoading(false);
}

export async function signInGoogle({ setLoading }: AppAuth) {
    setLoading(true);
    await signInWithPopup(auth, googleProvider);
    setLoading(false);
}

export async function signOut({ setLoading }: AppAuth) {
    setLoading(true);
    await firebaseSignOut(auth);
    setLoading(false);
}
