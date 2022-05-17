import {
    GithubAuthProvider,
    signOut as firebaseSignOut,
    getAuth,
    getRedirectResult,
    signInWithRedirect,
} from "firebase/auth";

import { AppAuth } from "@client/types/auth.type";

import firebaseApp from "./app";

const githubProvider = new GithubAuthProvider();

export async function signInGitHub(appAuth: AppAuth) {
    const { setUser, setLoading } = appAuth;
    setLoading(true);
    const auth = getAuth(firebaseApp);
    await signInWithRedirect(auth, githubProvider);
    const credential = await getRedirectResult(auth);
    setUser(credential ? { uid: credential.user.uid, email: credential.user.email } : null);
    setLoading(false);
}

export async function signOut(appAuth: AppAuth) {
    const { setUser, setLoading } = appAuth;
    setLoading(true);
    const auth = getAuth(firebaseApp);
    await firebaseSignOut(auth);
    setUser(null);
    setLoading(false);
}
