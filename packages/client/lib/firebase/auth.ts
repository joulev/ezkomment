import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    getAuth,
    linkWithPopup,
    signInWithPopup,
    unlink,
    updateProfile,
} from "firebase/auth";

import { AppAuth } from "@client/types/auth.type";

import { NOT_AUTHENTICATED } from "../errors";
import firebaseApp from "./app";

const auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

export async function signInGitHub({ setLoading }: AppAuth) {
    setLoading(true);
    await signInWithPopup(auth, githubProvider);
    setLoading(false);
}

export async function linkGitHub({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, githubProvider);
    setLoading(false);
}

export async function unlinkGitHub({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await unlink(auth.currentUser, githubProvider.providerId);
    setLoading(false);
}

export async function signInGoogle({ setLoading }: AppAuth) {
    setLoading(true);
    await signInWithPopup(auth, googleProvider);
    setLoading(false);
}

export async function linkGoogle({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, googleProvider);
    setLoading(false);
}

export async function unlinkGoogle({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await unlink(auth.currentUser, googleProvider.providerId);
    setLoading(false);
}
export async function signOut({ setLoading }: AppAuth) {
    setLoading(true);
    await firebaseSignOut(auth);
    setLoading(false);
}

export async function updateDisplayName({ setLoading }: AppAuth, displayName: string) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await updateProfile(auth.currentUser, { displayName });
    setLoading(false);
}
