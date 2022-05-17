import {
    GithubAuthProvider,
    signOut as firebaseSignOut,
    getAuth,
    signInWithPopup,
} from "firebase/auth";

import { AppAuth } from "@client/types/auth.type";

import firebaseApp from "./app";

const githubProvider = new GithubAuthProvider();

export async function signInGitHub(appAuth: AppAuth) {
    const { setUser, setLoading } = appAuth;
    setLoading(true);
    const auth = getAuth(firebaseApp);
    const result = await signInWithPopup(auth, githubProvider);
    setUser({ uid: result.user.uid, email: result.user.email });
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
